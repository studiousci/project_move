import { Transaction } from '@mysten/sui/transactions';
import { Button } from '@radix-ui/themes';
import { useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit';
import { useNetworkVariable } from './networkConfig';

export function CreateCounter({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const counterPackageId = useNetworkVariable('counterPackageId');
  const suiClient = useSuiClient();
  const { mutate: signAndExecute } = useSignAndExecuteTransaction();

  return (
    <Button
      size="3"
      onClick={() => {
        create();
      }}
    >
      Create Counter
    </Button>
  );

  // Helper function to retry fetching transaction details
  async function fetchTransactionWithRetry(digest: string, maxRetries = 5): Promise<any> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        const txDetails = await suiClient.getTransactionBlock({
          digest,
          options: {
            showEffects: true,
            showEvents: true,
            showObjectChanges: true,
            showInput: true,
          },
        });
        return txDetails;
      } catch (error: any) {
        console.log(`Attempt ${i + 1} failed:`, error.message);
        if (i === maxRetries - 1) {
          throw error;
        }
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
      }
    }
  }

  function create() {
    const txb = new Transaction();

    txb.moveCall({
      arguments: [],
      target: `${counterPackageId}::counter::create`,
    });

    signAndExecute(
      {
        transaction: txb,
      },
      {
        onSuccess: async (result) => {
          console.log('Transaction result:', result);

          try {
            // Use retry mechanism to fetch transaction details
            const txDetails = await fetchTransactionWithRetry(result.digest);

            console.log('Full transaction details:', txDetails);
            console.log('Object changes:', txDetails.objectChanges);

            let objectId: string | undefined;

            // Method 1: Check objectChanges for created Counter objects
            if (txDetails.objectChanges) {
              const createdCounter = txDetails.objectChanges.find(
                (change: any) => {
                  console.log('Checking change:', change);
                  return (
                    change.type === 'created' &&
                    change.objectType &&
                    (change.objectType.includes('Counter') ||
                      change.objectType.includes(`${counterPackageId}::counter::Counter`))
                  );
                },
              );

              if (createdCounter) {
                objectId = createdCounter.objectId;
                console.log('Found Counter via objectChanges:', objectId);
              }
            }

            // Method 2: Check effects.created as fallback
            if (!objectId && txDetails.effects?.created) {
              console.log('Checking effects.created:', txDetails.effects.created);
              // For shared objects, we might need to check all created objects
              for (const created of txDetails.effects.created) {
                console.log('Created object details:', created);
                if (created.reference?.objectId) {
                  objectId = created.reference.objectId;
                  console.log('Found object via effects.created:', objectId);
                  break;
                }
              }
            }

            console.log('Final object ID:', objectId);

            if (objectId) {
              onCreated(objectId);
            } else {
              console.error('Could not find created Counter object');
              console.error('Full transaction details:', JSON.stringify(txDetails, null, 2));
            }
          } catch (error) {
            console.error('Error fetching transaction details after retries:', error);

            // Fallback: If we can't get the full transaction details,
            // we can still try to navigate to a counter creation page
            // or show a success message asking user to refresh
            alert('Counter created successfully! Please refresh the page to see your counter.');
          }
        },
        onError: (error) => {
          console.error('Transaction failed:', error);
        },
      },
    );
  }
}
