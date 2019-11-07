import * as React from 'react';
import {shallow} from 'enzyme';

import {TimeRow, ITimeRowProps} from '../../../components/TimeTable/TimeRow';

describe("TimeRow Component", () => {
    let props: ITimeRowProps;
    let wrapper;
    let onDeleteClick;
    beforeEach(() => {
        onDeleteClick = jest.fn()
        props = {
            index: 0,
            onDay: "12-19-2019",
            deleteProjectTimestamp: onDeleteClick,
            timestamp: new Date(),
            id: "1234",
            hour: 3,
            projectId: "p-333"

        }
    })
    it("render currectly without note", () => {

        wrapper = shallow(<TimeRow {...props}/>)
        
        expect(wrapper.find("td").at(0).text()).toBe(`${props.index + 1}`)
        expect(wrapper.find("td").at(1).text()).toBe(`${props.hour}`)
        expect(wrapper.find("td").at(2).text()).toBe('-')
        expect(wrapper.find("td").at(3).text()).toBe(" x ")

        expect(props.deleteProjectTimestamp).toBeCalledTimes(0)
    })

    it("render currectly with fully props", () => {
        props.note = "this take my time"
        wrapper = shallow(<TimeRow {...props}/>)
        
        expect(wrapper.find("td").at(0).text()).toBe(`${props.index + 1}`)
        expect(wrapper.find("td").at(1).text()).toBe(`${props.hour}`)
        expect(wrapper.find("td").at(2).text()).toBe(props.note)
        expect(wrapper.find("td").at(3).text()).toBe(" x ")

        expect(props.deleteProjectTimestamp).toBeCalledTimes(0)
    })

    it("click delete working correct", () => {
        props.note = "this take my time"

        wrapper = shallow(<TimeRow {...props}/>)
        wrapper.find('button').simulate('click')
        
        expect(wrapper.find("td").at(0).text()).toBe(`${props.index + 1}`)
        expect(wrapper.find("td").at(1).text()).toBe(`${props.hour}`)
        expect(wrapper.find("td").at(2).text()).toBe(props.note)
        expect(wrapper.find("td").at(3).text()).toBe(" x ")
        expect(props.deleteProjectTimestamp).toBeCalledTimes(1)
        expect(props.deleteProjectTimestamp).toHaveBeenCalledWith(props.id);
    })
})