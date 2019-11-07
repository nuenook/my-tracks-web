import * as React from 'react';

import {mount} from 'enzyme';
import TimeForm, {ITimeFormProps} from '../../../components/TimeTable/TimeForm'

describe("TimeForm component", () => {
    let props: ITimeFormProps
    let wrapper;
    let onChangeProjectMock;
    let insertTimeStampMock;
    let realDate;
    beforeEach(() => {
        insertTimeStampMock = jest.fn()
        onChangeProjectMock = jest.fn()
        props = {
            projects: [],
            selectProject: "",
            insertTimeStamp: insertTimeStampMock,
            onChangeProject: onChangeProjectMock
        }


        const currentDate = new Date();
        realDate = Date;
        global.Date = class extends Date {
            constructor(date) {
            if (date) {
                return super(date);
            }

            return currentDate;
            }
        };

    })

    afterEach(() => {
        global.Date = realDate;
    })

    it("no projects, not show project select option and cannot submit", () => {
        wrapper = mount(<TimeForm {...props} />)
        
        wrapper.find('button').simulate('submit')
        

        expect(wrapper.find('option').length).toBe(0)
        expect(wrapper.find('#project').props().value).toBe("")
        expect(wrapper.find('#hours').props().value).toBe("0")
        expect(wrapper.find('#note').props().value).toBe("")
        // expect(insertTimeStampMock).toBeCalledTimes(0)
        expect(onChangeProjectMock).toBeCalledTimes(0)
    })

    it("no projects input hour input note, but cannot submit ", () => {
        const inputNote =  "my first hour";
        const inputHour = 1;

        wrapper = mount(<TimeForm {...props} />)
        wrapper.find('#hours').simulate('change', {
            target: { value: inputHour}
        })
        wrapper.find('#note').simulate('change', {
            target: { value: inputNote}
        })
        wrapper.find('button').simulate('submit')

        expect(wrapper.find('option').length).toBe(0)
        expect(wrapper.find('#project').props().value).toBe("")
        expect(wrapper.find('#hours').props().value).toBe(inputHour)
        expect(wrapper.find('#note').props().value).toBe(inputNote)
    })

    it("two projects input hour input note not select project, submit with first project", () => {
        

        props.projects = [
            {projectName: "first project", id: "p-111", userId: "u1"},
            {projectName: "second phase", id: "p-222", userId: "u1"}]
        props.selectProject = props.projects[0].id
        const inputNote =  "my first time";
        const inputHour = 3;
        
        wrapper = mount(<TimeForm {...props} />)
        wrapper.find('#hours').simulate('change', {
            target: { value: inputHour}
        })
        wrapper.find('#note').simulate('change', {
            target: { value: inputNote}
        })
        wrapper.find('button').simulate('submit')

        expect(wrapper.find('option').length).toBe(2)
        expect(wrapper.find('#project').props().value).toBe(props.selectProject)
        expect(wrapper.find('#hours').props().value).toBe(inputHour)
        expect(wrapper.find('#note').props().value).toBe(inputNote)
        expect(insertTimeStampMock).toBeCalledTimes(1)
        expect(insertTimeStampMock).toHaveBeenCalledWith({
            projectId: props.projects[0].id,
            hour: inputHour,
            note: inputNote,
            timestamp: new Date()
        })
        expect(onChangeProjectMock).toBeCalledTimes(0)

        
    })

    it("two projects input hour input note select second project, submit with second project", () => {
        props.projects = [
            {projectName: "first project", id: "p-111", userId: "u1"},
            {projectName: "second phase", id: "p-222", userId: "u1"}]
        props.selectProject = props.projects[1].id
        const inputNote =  "my first time";
        const inputHour = 3;
        
        wrapper = mount(<TimeForm {...props} />)
        wrapper.find('#hours').simulate('change', {
            target: { value: inputHour}
        })
        wrapper.find('#note').simulate('change', {
            target: { value: inputNote}
        })
        wrapper.find('button').simulate('submit')
        wrapper.find('#project').simulate('change', {
            target: { value: props.projects[1].id}
        })

        expect(wrapper.find('option').length).toBe(2)
        expect(wrapper.find('#project').props().value).toBe(props.selectProject)
        expect(wrapper.find('#hours').props().value).toBe(inputHour)
        expect(wrapper.find('#note').props().value).toBe(inputNote)
        expect(insertTimeStampMock).toBeCalledTimes(1)
        expect(insertTimeStampMock).toHaveBeenCalledWith({
            projectId: props.projects[1].id,
            hour: inputHour,
            note: inputNote,
            timestamp: new Date()
        })
        expect(onChangeProjectMock).toBeCalledTimes(1)
    })

})