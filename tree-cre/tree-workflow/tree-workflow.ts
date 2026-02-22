import { cre, type Runtime, encodeCallMsg, LAST_FINALIZED_BLOCK_NUMBER } from "@chainlink/cre-sdk";
import { z } from "zod";
import { encodeFunctionData, decodeFunctionResult, toHex, toBytes } from "viem";

const configSchema = z.object({
  schedule: z.string(),
  vaultAddress: z.string(),
  poolAAddress: z.string(),
  poolBAddress: z.string()
});
export type Config = z.infer<typeof configSchema>

const cron = new cre.capabilities.CronCapability()
const evm = new cre.capabilities.EVMClient(16015286601757825753n)

const poolAbi = [
    {
        name: "yieldRate",
        type: "function",
        stateMutability: "view",
        inputs: [],
        outputs: [{ type: "uint256" }]
    }
] as const

const onYieldCheck = async (runtime: Runtime<Config>): Promise<string> => {
    const { config } = runtime
    runtime.log("tree root monitoring yield")

    try {
        const encodedCallDataA = encodeFunctionData({
            abi: poolAbi,
            functionName: "yieldRate"
        });

        const responseA = await evm.callContract(runtime, {
            call: encodeCallMsg({
                from: "0x0000000000000000000000000000000000000000",
                to: config.poolAAddress as `0x${string}`,
                data: encodedCallDataA
            }),
            blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
        }).result();

        const yieldA = decodeFunctionResult({
            abi: poolAbi,
            functionName: "yieldRate",
            data: toHex(responseA.data)
        });

        const encodedCallDataB = encodeFunctionData({
            abi: poolAbi,
            functionName: "yieldRate"
        });

        const responseB = await evm.callContract(runtime, {
            call: encodeCallMsg({
                from: "0x0000000000000000000000000000000000000000",
                to: config.poolBAddress as `0x${string}`,
                data: encodedCallDataB
            }),
            blockNumber: LAST_FINALIZED_BLOCK_NUMBER,
        }).result();

        const yieldB = decodeFunctionResult({
            abi: poolAbi,
            functionName: "yieldRate",
            data: toHex(responseB.data)
        });

        runtime.log(`Yield monitoring: Pool A = ${yieldA}, Pool B = ${yieldB}`);

        const numYieldA = Number(yieldA);
        const numYieldB = Number(yieldB);

        if (numYieldB > numYieldA + 5) {
            runtime.log("Yield B is higher! Initiating rebalance logic...");
            
            return `ACTION_REQUIRED: Pindah ke Pool B`;
        }

        return "Stable Condition. no rebalance needed"

    } catch(err: any) {
        runtime.log(`Failed monitoring Yield: ${err}`);
        throw err;
    }
}

export const initWorkflow = (config: Config) => {
  return [
    cre.handler(
      cron.trigger({ schedule: config.schedule }),
      onYieldCheck
    )
  ]
}