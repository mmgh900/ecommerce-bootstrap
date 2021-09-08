import LayoutUserAction from "./layout-user-action";
import DeviceState from "../../lib/device-state";
import {setCurrentUser} from "../../redux/user.reducer";
import styles from './layout.module.scss'
import React from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {useLogoutMutation} from "../../redux/api.slice";
import {Dropdown} from "react-bootstrap";
import Link from 'next/link'
import IUser from "../../types/IUser";

export default function LayoutAccountUserAction({device, hideTitle}: { device: DeviceState, hideTitle?: boolean }) {
    const dispatch = useAppDispatch()
    const [logout] = useLogoutMutation()
    const user = useAppSelector(state => state.user.currentUser) as IUser
    return (
        <LayoutUserAction id={"account"} title={"کاربری"} icon={"fa-user"}
                          device={device} hideTitle={hideTitle}>
            <Dropdown.Menu className="shadow">
                <Dropdown.Item>
                    <div className="d-flex align-items-center">
                        <i className="fas fa-user me-3 text-primary"/>
                        <div className="ms-1">
                            <small className="mb-1">خوش آمدید!</small>
                            <h6 className="fw-bold text-primary">{`${user.firstName} ${user.lastName}`}</h6>
                        </div>
                    </div>
                </Dropdown.Item>
                <Link href={'/user'} passHref>
                    <Dropdown.Item>
                        <i className="fas fa-pen fa-sm me-3 text-primary"/>
                        ویرایش حساب کاربری
                    </Dropdown.Item>
                </Link>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={() => {
                    dispatch(setCurrentUser(null))
                    logout({})

                }}>

                    <i className="fas fa-sign-out fa-sm me-3 text-primary"/>
                    خروج از حساب

                </Dropdown.Item>
            </Dropdown.Menu>
        </LayoutUserAction>
    )
}