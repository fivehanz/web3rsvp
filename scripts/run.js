const hre = require("hardhat");

const main = async () => {
  const rsvpContractFactory = await hre.ethers.getContractFactory("Web3RSVP");
  const rsvpContract = await rsvpContractFactory.deploy();
  await rsvpContract.deployed();
  console.log("contract deployed to:", rsvpContract.address);

  // get eth accounts
  const [deployer, address1, address2] = await hre.ethers.getSigners();

  let deposit = hre.ethers.utils.parseEther("1");
  let maxCapacity = 3;
  let timestamp = 1718926200;
  let eventDataCID =
    "bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi";

  // create a new event
  let txn = await rsvpContract.createNewEvent(
    timestamp,
    deposit,
    maxCapacity,
    eventDataCID
  );
  let wait = await txn.wait();
  console.log("new event created:", wait.events[0].event, wait.events[0].args);

  // eventId
  let eventId = wait.events[0].args.eventId;
  console.log("EVENT ID:", eventId);

  // rsvp to the event (eventCreator)
  txn = await rsvpContract.createNewRSVP(eventId, { value: deposit });
  wait = await txn.wait();
  console.log("New rsvp:", wait.events[0].event, wait.events[0].args);

  // rsvp to the event by address 1
  txn = await rsvpContract
    .connect(address1)
    .createNewRSVP(eventId, { value: deposit });
  wait = await txn.wait();
  console.log("new rsvp:", wait.events[0].event, wait.events[0].args);

  // rsvp to the event by address 2
  txn = await rsvpContract
    .connect(address2)
    .createNewRSVP(eventId, { value: deposit });
  wait = await txn.wait();
  console.log("new rsvp:", wait.events[0].event, wait.events[0].args);

  // confirm all attendees
  txn = await rsvpContract.confirmAllAttendees(eventId);
  wait = await txn.wait();
  wait.events.forEach((event) => {
    console.log("confirmed:", event.args.attendeeAddress);
  });

  // wait 10 years
  await hre.network.provider.send("evm_increaseTime", [15778800000000]);

  // withdraw the unclaimed deposits
  txn = await rsvpContract.withdrawUnclaimedDeposits(eventId);
  wait = await txn.wait();
  console.log("withdrawn: ", wait.events[0].event, wait.events[0].args);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();
