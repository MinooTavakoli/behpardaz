import React from "react";
import plusIcon from "../../assets/icons/plus.png";
import "./Table.css"

export default function Table({ TableHeaderList = [], data = [], userDetailClicked = () => { }, setAddUser = () => { }, setOpenUserDetails = () => { } }) {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    {
                        TableHeaderList?.map((_title, index) => {
                            return (
                                <th key={`_${index}`}>{_title?.headerTitle}</th>
                            )
                        })
                    }
                </tr>
                <div className="add-user" onClick={() => {
                    setAddUser(true);
                    setOpenUserDetails(true)
                }}>
                    <img src={plusIcon} alt="add-user-icon" />
                </div>
            </thead>
            <tbody className="tbody">
                {
                    data?.map((user, index) => {
                        return (
                            <tr key={`_tbody${index}`} onClick={() => userDetailClicked(user.id)}>
                                <th>{user.id}</th>
                                <td>
                                    {user.firstName}
                                </td>
                                <td>
                                    {user.lastName}
                                </td>
                                <td>
                                    {user.city}
                                </td>
                                <td>
                                    {user.address}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}