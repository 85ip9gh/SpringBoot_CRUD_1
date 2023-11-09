import { useEffect, useState } from "react"
import { retrieveAllUsers } from "../api/CarSaleApiService";

export default function AllUsersComponent() {

    const [users, setUsers] = useState(['a', 'b', 'c', 'd', []]);

    async function refreshAllUsers() {
        const allUsers = await retrieveAllUsers();
        setUsers(allUsers.data);
        console.log(allUsers.data);
        console.log(users);
    }

    useEffect(() => {
        refreshAllUsers();
    }, []);

    return (
        <div className="container">
            <p className="container-title">
                Users
            </p>
            <div className="grid-container-user">
                <div className="upper-card-user">
                    <div className="card card-user">
                        <div><strong>ID</strong></div>
                        <div><strong>NAME</strong></div>
                        <div><strong>PASSWORD</strong></div>
                        <div><strong>ROLES</strong></div>
                        <div><strong>CARS</strong></div>
                        <div><strong>SHOW CARS</strong></div>
                        <div><strong>REMOVE</strong></div>
                    </div>

                </div>

                {users.map(
                    user => (
                        <div key={user.id} className="upper-card-user" >
                            <div className="card card-user">

                                <div>{user.id} </div>
                                <div>{user.name} </div>
                                <div>{user.password} </div>
                                <div>{user.roles} </div>
                                <div>{user.myCars?.length}</div>
                                <button className="btn cars-btn">Cars</button>
                                <button className="btn">Remove User</button>
                                <div className="car-list">{
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
                        </div>
                    )

                )}
            </div>
        </div>
    )
}