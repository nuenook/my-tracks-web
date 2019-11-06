import * as React from 'react';
import {shallow} from 'enzyme';

import ProjectTable, {IProjectTableProps} from '../../../components/projects/ProjectTable'

describe("ProjectTable component", () => {
    let projectTableProps: IProjectTableProps;
    let wrapper;
    beforeEach(() => {
        projectTableProps = {
            projects: []
        }
    })
    
    it("render on zero project, should be able rendering", () => {
        wrapper = shallow(<ProjectTable {...projectTableProps}/>)

        expect(wrapper.find('p').text()).toBe('No Project Data...')
        expect(wrapper.find('table')).toHaveLength(0)
    })

    it("render one project", () => {
        projectTableProps.projects = [
            {
                userId: "user-1234",
                id: "pro-321",
                projectName: "Project One"
            }
        ]

        wrapper = shallow(<ProjectTable {...projectTableProps}/>)

        expect(wrapper.find('table')).toHaveLength(1)
        expect(wrapper.find('ProjectRow')).toHaveLength(1)
    })

    it("render more one projects", () => {
        projectTableProps.projects = [
            {
                userId: "user-1234",
                id: "pro-321",
                projectName: "Project One"
            },
            {
                userId: "user-333",
                id: "pro-222",
                projectName: "Project Two"
            }
        ]

        wrapper = shallow(<ProjectTable {...projectTableProps}/>)

        expect(wrapper.find('table')).toHaveLength(1)
        expect(wrapper.find('ProjectRow')).toHaveLength(2)
    })
})