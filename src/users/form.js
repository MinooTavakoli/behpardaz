import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import PopUp from '../components/Popup/Popup';
import Table from '../components/Table/Table';
import axios from "axios";
import "./form.css";

const queryClient = new QueryClient()

export default function Form() {
    return (
        <QueryClientProvider client={queryClient}>
            <Users />
        </QueryClientProvider>
    )
}

function Users() {
    const [openUserDetails, setOpenUserDetails] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [userData, setUserData] = useState([]);
    const [userEditData, setUserEditData] = useState([]);
    const [userAddData, setUserAddData] = useState([]);
    const [userInput, setUserInput] = useState({});
    const [addUser, setAddUser] = useState(false);

    const { isLoading, error, data } = useQuery('repoData', () =>
        fetch('https://63581241c27556d289368088.mockapi.io/api/v1/users').then(res =>
            res.json()
        )
    )

    if (isLoading) return 'Loading...'
    if (error) return 'An error has occurred: ' + error.message;

    const getData = () => {
        axios.get("https://63581241c27556d289368088.mockapi.io/api/v1/users").then(res => {
            const personData = res.data;
            setDataList(personData)
        })
    }

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
                const personEdit = res.data;
                setUserEditData(personEdit);
            })
        setOpenUserDetails(false);
        getData();
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
    };

    let TableHeaderList = [
        { headerTitle: "#" },
        { headerTitle: "First Name" },
        { headerTitle: "city" },
        { headerTitle: "address" },
    ]

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
                        <button className="cancel-button" onClick={() => setOpenUserDetails(false)}>Cancel</button>
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
