import React, {useEffect} from 'react'
import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {getTaskAction} from "../../store/actions/tasks";

const TaskScreen = () => {
    const { error, loading, task } = useAppSelector(state => state.getTask)
    const dispatch = useAppDispatch();
    const { id } = useParams();
    useEffect(()=> {
        if(!error && !loading && !task){
            if(id){
                dispatch(getTaskAction(id))
            }
        }
    }, [error, loading, task])
    return <div className={'container-fluid py-2'}>
        <div className={'row'}>
            <div className={'col'}>
                {error && <div className={'invalid-feedback d-block'}>{error}</div>}
                {task && <div className={'h5'}>{task.name}</div>}
                {loading && <div> Loading </div>}
            </div>
        </div>
    </div>
}

export default TaskScreen;