// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.5.0 <0.8.0;
pragma experimental ABIEncoderV2;

/** 
 * @title NoteTogether
 * @dev handles storage of
 */
contract NoteTogether {
   
   
    struct Video {
        string IPFSkey; //hash key for retrieving video from IPFS directory
        string pageLink; //sharable link that is used to access video metadata
    }

    struct Note {
        string timestamp; //timestamp of the video tied to a note
        string tag; //message type
        string content; //content of the note
        User user; //user tied to the note
    }
    
    struct viewAnalytics { //temporary struct
        string viewData;
    }
    
    struct User {
        address userAdr; //user wallet address
        string username; //custom name
    }
    
    
    mapping(string => Video) videoMap; //map of videos to their id by page link
    
    mapping(string => Note[]) noteMap; //map of note lists to video id
    
    mapping(string => viewAnalytics) viewMap; //map of view analytics to video via pageLink
    
    mapping(address => string) usernameMap; //map of user addresses to usernames
    
    
    
    /** 
     * @dev creates video metadata storage with an IPFS key and the page link
     * @param key, pageLink a
     */
    function addVideo(string memory key, string memory pageLink) public returns (string memory link) {
        
        Video memory vid = Video(key, pageLink);
        videoMap[pageLink] = vid;
    }
    
    /**
     * @dev pulls Video metadata of a corresponding video id
     * @param link pagelink
     */
    function getVideoData(string memory link) public returns ( Video memory video) {
        return videoMap[link];
    }
    
    /**
     * @dev generates a note for a video 
     * @param pageLink, timestamp, tag, content, user
     */
    function addNote(string memory pageLink, string memory timestamp, string memory tag, string memory content, User memory user) public {
        Note memory note = Note(timestamp, tag, content, user);
        noteMap[pageLink].push(note);
    }
    
    /**
     * @dev pulls the list of notes cooresponding to a video
     * @param link a
     */
    function getNotes(string memory link) public returns (Note[] memory) {
        return noteMap[link];
    }
    
    /**
     * @dev adds viewership data to existing viewership data
     * @param link, viewData
     */
    function addViewData(string memory link, string memory viewData) public {}
    
    /**
     * @dev
     * @param user a
     */
    function getUsername() public returns (string memory username) {
        return usernameMap[msg.sender];
    }
    
    /**
     * @dev
     * @param user, username
     */
    function changeUsername(string memory username) public {
        usernameMap[msg.sender] = username;
    }
}
