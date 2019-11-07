import * as React from 'react';
import {shallow, mount} from 'enzyme';

import ProjectForm, {IProjectFormProps} from '../../../components/projects/ProjectForm'

describe("ProjectForm components", () => {
    let props: IProjectFormProps;
    let wrapper;
    let onClickMock: jest.Mock<any, any>;

    beforeEach(() => {
        onClickMock = jest.fn()
        props = {
            onCreateNewProject: onClickMock
        }
    })
    it("empty project, cannot submit form", () => {
        wrapper = shallow(<ProjectForm {...props} />)

        wrapper.find("button").simulate('submit')
        expect(onClickMock).toBeCalledTimes(0)
    })

    it("enter project, can submit form and reset form", () => {
        wrapper = mount(<ProjectForm {...props} />)
        const inputProjectName = "project one";
        
        wrapper.find("input").simulate('change', {
            target: {value: inputProjectName}
        })
        wrapper.find("button").simulate('submit')

        expect(onClickMock).toBeCalledTimes(1)
        expect(wrapper.find("input").props().value).toBe("")
    })
})