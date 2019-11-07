import * as React from 'react';
import {shallow} from 'enzyme';

import TimeTable, {ITimeTableProps} from '../../../components/TimeTable/TimeTable'

describe("TimeTable component", () => {
    let props: ITimeTableProps;
    let wrapper;
    beforeEach(() => {
        props = {
            timeData: []
        }
    })

    it("when not pass timeData, TimeRow should empty", () => {
        wrapper = shallow(<TimeTable {...props}/>)

        console.log(wrapper.debug())
        expect(wrapper.find('TimeRow').length).toBe(0)
        expect(wrapper.find('table')).toHaveLength(1)
    })

    it("when pass 3 timeData, should render 3 TimeRow", () => {
        props.timeData = [
            {
                id: "t-01",
                note: "",
                onDay: "12-11-2019",
                timestamp: new Date(),
                hour: 3,
                projectId: "p-01"
            },
            {
                id: "t-02",
                note: "my note",
                onDay: "13-11-2019",
                timestamp: new Date(),
                hour: 5,
                projectId: "p-01"
            },
            {
                id: "t-02",
                note: "",
                onDay: "14-11-2019",
                timestamp: new Date(),
                hour: 2,
                projectId: "p-01"
            }
        ];

        wrapper = shallow(<TimeTable {...props}/>)

        expect(wrapper.find('tbody').children().length).toBe(3)
        expect(wrapper.find('table')).toHaveLength(1)
    })
})