import { useEffect, useState } from "react"
import { retrieveAllUsers } from "../api/CarSaleApiService";

export default function AllUsersComponent() {

    const [users, setUsers] = useState(['a', 'b', 'c', 'd', []]);
    const [showUserCars, setShowUserCars] = useState();

    async function refreshAllUsers() {
        const allUsers = await retrieveAllUsers();
        setUsers(allUsers.data);
        console.log(allUsers.data);
        console.log(users);
    }

    useEffect(() => {
        refreshAllUsers();
    }, []);

    function showCars(userId) {
        setShowUserCars(userId);
    }

    return (
        <div className="container">
            <div className="all-users-container">
                <p className="container-title">
                    Users
                </p>
                <div className="grid-container-user">
                    <div className="card card-user card-user-header">
                        <div><strong>ID</strong></div>
                        <div><strong>NAME</strong></div>
                        <div><strong>PASSWORD</strong></div>
                        <div><strong>ROLES</strong></div>
                        <div><strong>CARS</strong></div>
                        <div><strong>SHOW CARS</strong></div>
                        <div><strong>REMOVE</strong></div>
                    </div>

                    <div className="user-rows">


                        {users.map(
                            user => (

                                <div className="card card-user">
                                    <div>{user.id} </div>
                                    <div>{user.name} </div>
                                    <div>{user.password} </div>
                                    <div>{user.roles} </div>
                                    <div>{user.myCars?.length}</div>
                                    <button className="btn cars-btn all-users-btn-cars" onClick={() => showCars(user.id)} >Cars</button>
                                    <button className="btn all-users-btn-remove">Remove User</button>
                                    <div className="car-list" style={showUserCars == user.id ? { display: "block" } : { display: "none" }} >{
                                        user.myCars?.map(
                                            car => (
                                                <div key={car.id} className="car-details">
                                                    <div>{car.id}</div>
                                                    <div>{car.brand}</div>
                                                    <div className="car-color" style={{ backgroundColor: car.color }}></div>
                                                    <div>{car.type}</div>
                                                    <div>{car.age}</div>
                                                    <button className="btn btn-my-car"
                                                    // onClick={() => sellCarFunction(car.id)}
                                                    >
                                                        List for Sale
                                                    </button>
                                                    <button className="btn btn-my-car"
                                                    //onClick={() => updateCarFunction(car.id, car.brand, car.color,car.type, car.age)}
                                                    >
                                                        Update Car
                                                    </button>
                                                    <button className="btn btn-my-car"
                                                    //onClick={() => removeCarFunction(car.id)}
                                                    >
                                                        Remove Car
                                                    </button>
                                                </div>
                                            )
                                        )
                                    } </div>
                                </div>

                            )

                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}