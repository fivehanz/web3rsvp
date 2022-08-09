// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Web3RSVP {
    // structure of an Event
    struct CreateEvent {
        bytes32 eventId;
        string eventDataCID;
        address eventOwner;
        uint256 eventTimestamp;
        uint256 deposit;
        uint256 maxCapacity;
        address[] confirmedRSVPs;
        address[] claimedRSVPs;
        bool paidOut;
    }

    // map an uniqueID to an event
    mapping(bytes32 => CreateEvent) public idToEvent;

    // actual function which creates a new event instance
    function createNewEvent(
        uint256 eventTimestamp,
        uint256 deposit,
        uint256 maxCapacity,
        string calldata eventDataCID
    ) external {

        // generate an eventId hash
        bytes32 eventId = keccak256(
            abi.encodePacked(
                msg.sender,
                address(this),
                eventTimestamp,
                deposit,
                maxCapacity
            )
        );

        // make sure this id isn't already claimed
        require(idToEvent[eventId].eventTimestamp == 0, "ALREADY REGISTERED");

        address[] memory confirmedRSVPs;
        address[] memory claimedRSVPs;

        // this creates a new CreateEvent struct and adds it to the idToEvent mapping
        idToEvent[eventId] = CreateEvent(
            eventId,
            eventDataCID,
            msg.sender,
            eventTimestamp,
            deposit,
            maxCapacity,
            confirmedRSVPs,
            claimedRSVPs,
            false
        );



    }

    // RSVP to the event (from the front-end)
    function createNewRSVP(bytes32 eventId) external payable {

    }

    // checks in the attendees and returns their deposit
    function confirmAttendees(bytes32 eventId, address attendee) public {

    }

    // confirm the whole group
    function confirmAllAttendees(bytes32 eventId) external {
        
    }

    // send unclaimed deposits to event organizer
    function withdrawUnclaimedDeposits(bytes32 eventId) external {
        
    }
}