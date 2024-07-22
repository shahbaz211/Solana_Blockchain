const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet  = new Keypair();

const publicKey = new PublicKey(wallet._keypair.publicKey)
const secretKey = wallet._keypair.secretKey


console.log(publicKey);
console.log(secretKey);

const getwalletBalance = async () => {
    try{
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
    const walletBalance = await connection.getBalance(publicKey);
    console.log('Wallet Balance Is ',walletBalance)
    }catch (err){
        console.log(err)
    }
}

const airDropSol = async () => {
    try{
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        // /const fromAirDrop = await connection.requestAirdrop(publicKey, 20 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(
            await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
          );
        }catch (err){
            console.log(err)
        }
}
const main = async () =>{
    await getwalletBalance()
    await airDropSol()
    await getwalletBalance()
}

main();