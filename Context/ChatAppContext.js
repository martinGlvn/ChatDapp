// Features for connecting to our smart contract, messages, accounts, readings.

import React,{useState, useEffect} from 'react';
import { useRouter } from "next/router";

// Interal Import 
import { CheckWalletConnected, connectWallet, connectingWithContract } from "../Utils/ApiFeature"

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children})=>{
    // UseState
    const [ account, setAccount ] = useState('');
    const [ username, setUsername ] = useState('');
    const [ friendLists, setFriendLists ] = useState([]); 
    const [ friendMsg, setFriendMsg ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ userLists, setUserLists] = useState([]);
    const [ error, setError ] = useState("");

    // Chat User Data
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    //Fech Data Time of Page Load
    const fetchData = async()=>{
        try{
            // Get Contract
            const contract = await connectingWithContract();
            // Get Account
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            // Get User Name
            const userName = await contract.getUserName(connectAccount);
            setUsername(userName);
            // Get My Friend List
            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists)
            // Get all App User List
            const userList = await contract.getAllAppUser();
            setUserLists(userList);
        }catch(error){
            setError("Please Install And Connect Your Wallet");
        }
    }
    useEffect(()=>{
        fetchData();
    }, []); 

    // Read Message
    const readMessage = async(friendAddress)=>{
        try{
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error){
            setError("Currently You Have no Message");
        }
    }

    // Create Account 
    const createAccount = async({name, accountAddress})=>{
        try{
            if(name || accountAddress) return setError("Name And Account, cannot bet emty");
            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            setLoading(false);
            window.location.reload();
        } catch(error) {
            setError("Error while creating your account Pleas reload brow")
        }
    }

    // Add Your Friends
    const addFriends = async ({name, accountAddress}) =>{
        try {
            if(name || accountAddress) return setError("Please Provider");
            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();
            }catch (error){
            setError("Something went wrong while adding friends, try again")
        }
    };

    // Set Message to Your Friend
    const sendMessage = async ({msg, address }) =>{
        try{
            if(msg || address) return setError("Please Type your Message");

            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();
        }catch(error){
            setError("Please reload and try again");
        }
    }

    // Read Info
    const readUser = async (userAddress) =>{
        const contract = await connectingWithContract();
        const userName = await contract.getUserName(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    }
    
    return(
        <ChatAppContext.Provider value=
        
            {{ 
                readMessage, createAccount, addFriends, sendMessage, readUser,
                account, username, friendLists, friendMsg, loading, userLists, error,
                currentUserName, currentUserAddress,
            }}>{children}

        </ChatAppContext.Provider>
    )
}