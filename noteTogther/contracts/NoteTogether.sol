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
        string pageLink; //sharable link that is used to access video metadata
        address user; //video uploader
    }

    struct Note {
        string timestamp; //timestamp of the video tied to a note
        string tag; //message type
        string content; //content of the note
        address user; //user tied to the note
    }
    
    struct Analytics {
        string viewData; //analytics metadata for viewership
        string noteData; //analytics metadata for note taking
    }
    
    
    
    
    mapping(string => Video) videoMap; //map of videos to their id by page link
    
    mapping(string => Note[]) noteMap; //map of note lists to video id
    
    mapping(string => Analytics) analyticsMap; //map of view analytics to video via pageLink
    
    mapping(address => string) usernameMap; //map of user addresses to usernames
    
    
    
    /** 
     * @dev creates video metadata storage with an IPFS key and the page link
     * @param key, pageLink
     */
    function addVideo(string memory key, string memory pageLink) public returns (string memory link) {
        
        Video memory vid = Video(key, pageLink, msg.sender);
        videoMap[pageLink] = vid;
        
        
    }
    
    /**
     * @dev pulls Video metadata of a corresponding page link
     * @param link pagelink
     */
    function getVideoData(string memory link) public returns ( Video memory video) {
        return videoMap[link];
    }
    
    /**
     * @dev stores a note for a video 
     * @param pageLink, timestamp, tag, content, user
     */
    function addNote(string memory pageLink, string memory timestamp, string memory tag, string memory content) public {
        Note memory note = Note(timestamp, tag, content, msg.sender);
        noteMap[pageLink].push(note);
    }
    
    /**
     * @dev pulls the list of notes cooresponding to a video
     * @param link  page link tied to video
     */
    function getNotes(string memory link) public returns (Note[] memory) {
        return noteMap[link];
    }
    
    /**
     * @dev updates analytics with latest data from Compute Engine
     * @param link, noteData, viewData
     */
    function updateAnalytics(string memory link, string memory noteData, string memory viewData) public {
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
     * @dev changes username of message sender
     * @param username name tied to user address
     */
    function changeUsername(string memory username) public {
        usernameMap[msg.sender] = username;
    }
}
        
        