import * as React from 'react';

import {shallow} from 'enzyme';
import ProjectRow, {IProjectRowProps} from '../../../components/projects/ProjectRow'

describe('ProjectRow component', () => {
        let projectRowProps: IProjectRowProps;
        let wrapper: any;
        beforeEach(() => {
            projectRowProps = {
                id: "123",
                index: 0,
                userId: "3333",
                projectName: "project one"
            }
        })

        it('show index, projectName and button', () => {

            wrapper = shallow(<ProjectRow {...projectRowProps} />)

            expect(wrapper.find('td').at(0).text()).toBe(`${projectRowProps.index + 1}`)
            expect(wrapper.find('td').at(1).text()).toBe(projectRowProps.projectName)
            expect(wrapper.find('td').at(2).text()).toBe('x')
        });

        it('show index, projectName and button with diffrent data', () => {
            projectRowProps.index = 2;
            projectRowProps.projectName = "Hello WWW"

            wrapper = shallow(<ProjectRow {...projectRowProps} />)

            expect(wrapper.find('td').at(0).text()).toBe(`${projectRowProps.index + 1}`)
            expect(wrapper.find('td').at(1).text()).toBe(projectRowProps.projectName)
            expect(wrapper.find('td').at(2).text()).toBe('x')
        });
})
