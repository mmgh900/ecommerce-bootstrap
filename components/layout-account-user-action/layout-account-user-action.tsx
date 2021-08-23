import LayoutUserAction from "../layout-user-action/layout-user-action";
import DeviceState from "../../lib/device-state";
import {setCurrentUser} from "../../redux/user.reducer";
import getApiUrl from "../../lib/backend-root";
import React from "react";
import {useAppDispatch} from "../../redux/hooks";

export default function LayoutAccountUserAction ({device, hideTitle}:{device: DeviceState, hideTitle?: boolean}) {
    const dispatch = useAppDispatch()
    return (
        <LayoutUserAction id={"account"} title={"کاربری"} icon={"fa-user"}
                          device={device} hideTitle={hideTitle}>
            <ul className="user-options-drop-down dropdown-menu mt-2 shadow"
                aria-labelledby="userPageForLarge">
                <li>
                    <div className="d-flex align-items-center dropdown-item">

                        <i className="far fa-user me-2 fa-sm"/>

                        <div className="ms-1">
                            <small className="mb-1">خوش آمدید!</small>
                            <h6 className="fw-bold text-primary">تقی محمدآبادی</h6>
                        </div>

                    </div>
                </li>
                <li>
                    <a className="dropdown-item" href="#">
                        <i className="far fa-pen fa-sm me-2"/>
                        ویرایش حساب کاربری
                    </a>
                </li>
                <li>

                    <button className="dropdown-item" onClick={() => {
                        dispatch(setCurrentUser(null))
                        fetch(getApiUrl('/api/user/logout'), {
                            credentials: 'include',
                            method: 'POST',
                            headers: {
                                'Content-Type': "application/json",
                            },
                        })
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {

                            })
                            .catch(error => {

                            });

                    }}>
                        <i className="far fa-sign-out fa-sm me-2 "/>
                        خروج از حساب
                    </button>
                </li>
            </ul>
        </LayoutUserAction>
    )
}