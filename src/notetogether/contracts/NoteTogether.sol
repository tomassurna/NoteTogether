// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

/**
 * @title NoteTogether
 * @dev handles storage of video metadata for the NoteTogether web app
 */
contract NoteTogether {
    struct Video {
        string IPFSkey; //hash key for retrieving video from IPFS directory
        string title; //sharable link that is used to access video metadata
        address user; //video uploader
    }

    struct Note {
        string timestamp; //timestamp of the video tied to a note
        string tag; //message type
        string message; //content of the note
        address user; //user tied to the note
    }

    struct Analytics {
        string viewData; //analytics metadata for viewership
        string noteData; //analytics metadata for note taking
    }

    mapping(string => Video) videoMap; //map of videos to their id by page link

    mapping(string => Note[]) noteMap; //map of note lists to video id

    mapping(string => Analytics) analyticsMap; //map of view analytics to video via key

    mapping(address => string) usernameMap; //map of user addresses to usernames

    mapping(address => string[]) interactionMap; //map of users to a list of keys for videos they uploaded, added a note to, or saved

    /**
     * @dev creates video metadata storage with an IPFS key and the page link
     * @param key, key
     */
    function addVideo(string memory key, string memory title) public {
        Video memory vid = Video(key, title, msg.sender);
        videoMap[key] = vid;

        interactionMap[msg.sender].push(key);
    }

    /**
     * @dev pulls Video metadata of a corresponding page link
     * @param link key
     */
    function getVideoData(string memory link)
        public
        returns (Video memory video)
    {
        return videoMap[link];
    }

    /**
     * @dev stores a note for a video
     * @param key, timestamp, tag, content, user
     */
    function addNote(
        string memory key,
        string memory timestamp,
        string memory tag,
        string memory message,
        address user
    ) public {
        Note memory note = Note(timestamp, tag, message, user);
        noteMap[key].push(note);

        if (interactionMap[user].length == 0) {
            interactionMap[user].push(key);
        } else {
            for (uint256 i = 0; i < interactionMap[user].length; i++) {
                if (
                    keccak256(abi.encodePacked(interactionMap[user][i])) ==
                    keccak256(abi.encodePacked(key))
                ) {
                    return;
                }
            }
            interactionMap[user].push(key);
        }
    }

    /**
     * @dev pulls the list of notes cooresponding to a video
     * @param link  page link tied to video
     */
    function getNotes(string memory link) public returns (Note[] memory) {
        return noteMap[link];
    }

    /**
     * @dev updates analytics with latest data from Calc Engine
     * @param link, noteData, viewData
     */
    function updateAnalytics(
        string memory link,
        string memory noteData,
        string memory viewData
    ) public {
        Analytics memory ana = Analytics(viewData, noteData);
        analyticsMap[link] = ana;
    }

    /**
     * @dev returns the username tied to message sender
     */
    function getUsername() public returns (string memory username) {
        return usernameMap[msg.sender];
    }

    /**
     * @dev returns the username tied to message sender
     */
    function getUsernameById(address user)
        public
        returns (string memory username)
    {
        return usernameMap[user];
    }

    /**
     * @dev changes username of message sender
     * @param username name tied to user address
     */
    function changeUsername(string memory username) public {
        usernameMap[msg.sender] = username;
    }

    /**
     * @dev returns all videos the user has interacted with
     *
     */
    function getInteractions(address user) public returns (string[] memory) {
        return interactionMap[user];
    }
}
