import LayoutUserAction from "./layout-user-action";
import DeviceState from "../../lib/device-state";
import {setCurrentUser} from "../../redux/user.reducer";
import styles from './layout.module.scss'
import React from "react";
import {useAppDispatch} from "../../redux/hooks";
import {useLogoutMutation} from "../../redux/api.slice";
import {Dropdown} from "react-bootstrap";
import Link from 'next/link'

export default function LayoutAccountUserAction({device, hideTitle}: { device: DeviceState, hideTitle?: boolean }) {
    const dispatch = useAppDispatch()
    const [logout] = useLogoutMutation()
    return (
        <LayoutUserAction id={"account"} title={"کاربری"} icon={"fa-user"}
                          device={device} hideTitle={hideTitle}>
            <Dropdown.Menu className="user-options-drop-down mt-2 shadow">
                <Dropdown.Item>
                    <div className="d-flex align-items-center dropdown-item">

                        <i className="far fa-user me-2 fa-sm"/>

                        <div className="ms-1">
                            <small className="mb-1">خوش آمدید!</small>
                            <h6 className="fw-bold text-primary">تقی محمدآبادی</h6>
                        </div>

                    </div>
                </Dropdown.Item>
                <Link href={'/user'} passHref>
                    <Dropdown.Item>
                        <i className="far fa-pen fa-sm me-2"/>
                        ویرایش حساب کاربری
                    </Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => {
                    dispatch(setCurrentUser(null))
                    logout({})

                }}>

                    <i className="far fa-sign-out fa-sm me-2 "/>
                    خروج از حساب

                </Dropdown.Item>
            </Dropdown.Menu>
        </LayoutUserAction>
    )
}