import React, { useEffect, useState } from 'react';
import PopUp from '../components/Popup/Popup';
import Table from '../components/Table/Table';
import axios from "axios";
import "./form.css";

export default function Form() {

    const [openUserDetails, setOpenUserDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const [userData, setUserData] = useState([]);
    const [userEditData, setUserEditData] = useState([]);
    const [userAddData, setUserAddData] = useState([]);
    const [userInput, setUserInput] = useState({});
    const [addUser, setAddUser] = useState(false);
    const [data, setData] = useState([]);

    const getData = () => {
        axios.get("https://63581241c27556d289368088.mockapi.io/api/v1/users").then(res => {
            setLoadingPage(false)
            const personData = res.data;
            setData(personData)
        })
        setLoadingPage(true)
    }
    useEffect(() => {
        setLoadingPage(true)
        getData();
    }, [userEditData,userAddData])

    const userDetailClicked = (id) => {
        setOpenUserDetails(true)
        axios.get(`https://63581241c27556d289368088.mockapi.io/api/v1/users/${id}`)
            .then(res => {
                setLoading(false)
                const persons = res.data;
                setUserData(persons);
            })
        setLoading(true)
    };

    const userEditClicked = (id) => {
        axios.put(`https://63581241c27556d289368088.mockapi.io/api/v1/users/${id}`, userInput)
            .then(res => {
                setLoadingPage(true)
                const personEdit = res.data;
                setUserEditData(personEdit);
            })
        setOpenUserDetails(false);
    };

    const userAddClicked = () => {
        axios.post('https://63581241c27556d289368088.mockapi.io/api/v1/users', userInput, {
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                const personAdd = response;
                setUserAddData(personAdd);
            })
        setOpenUserDetails(false);
        getData();
        setAddUser(false)
    };

    let TableHeaderList = [
        { headerTitle: "#" },
        { headerTitle: "First Name" },
        { headerTitle: "Last Name" },
        { headerTitle: "city" },
        { headerTitle: "address" },
    ]

    if (loadingPage) return 'Loading...'

    return (
        <React.Fragment>
            <Table
                TableHeaderList={TableHeaderList}
                userDetailClicked={userDetailClicked}
                data={data}
                setAddUser={setAddUser}
                setOpenUserDetails={setOpenUserDetails}
            />
            {
                openUserDetails &&
                <PopUp isOpen={openUserDetails} closeModal={setOpenUserDetails}>
                    <div className="user-wrapper">
                        {loading ? (
                            <h3>LOADING ....</h3>)
                            : (
                                <>
                                    <h4 className="title-user">User Number: {userData?.id}</h4>
                                    <hr />
                                    <div className="user-item-wrapper">
                                        <div className="user-item">
                                            <div>FirstName : </div>
                                            <input type="text" defaultValue={addUser ? "" : userData?.firstName} onChange={(e) => {
                                                setUserInput({
                                                    ...userInput,
                                                    firstName: e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="user-item">
                                            <div>Lastname : </div>
                                            <input type="text" defaultValue={addUser ? "" : userData?.lastName} onChange={(e) => {
                                                setUserInput({
                                                    ...userInput,
                                                    lastName: e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="user-item">
                                            <div>City : </div>
                                            <input type="text" defaultValue={addUser ? "" : userData?.city} onChange={(e) => {
                                                setUserInput({
                                                    ...userInput,
                                                    city: e.target.value
                                                })
                                            }} />
                                        </div>
                                        <div className="user-item">
                                            <div>Address : </div>
                                            <input type="text" defaultValue={addUser ? "" : userData?.address} onChange={(e) => {
                                                setUserInput({
                                                    ...userInput,
                                                    address: e.target.value
                                                })
                                            }} />
                                        </div>
                                    </div>
                                    {
                                        !addUser &&
                                        <div className="date-item">{userData?.createdAt}</div>
                                    }
                                </>
                            )}
                    </div>
                    <div className="button-wrapper">
                        <button className="cancel-button" onClick={() => {
                            setOpenUserDetails(false); setAddUser(false)
                        }}>Cancel</button>
                        <button className="edit-button" onClick={() =>
                            addUser ? userAddClicked() : userEditClicked(userData?.id)}>
                            {addUser ? "Add" : "Edit"}
                        </button>
                    </div>
                </PopUp>
            }
        </React.Fragment>
    )
}
