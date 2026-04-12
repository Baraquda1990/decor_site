'use client'
import apiService from "@/app/services/apiService"
import {DateRangePicker} from "@heroui/react";
import { useState,useEffect } from "react";
import { RangeValue } from "@react-types/shared";
import { DateValue } from "@internationalized/date";
import { parseDate } from "@internationalized/date";
/*
Выбор даты аренды.
*/
type props={
    userId:string|null,
    dateStart:string|undefined,
    dateEnd:string|undefined
}
export default function DateRange({userId,dateStart,dateEnd}:props){
    if(!userId) return <></>
    
    const [range,setRange]=useState<RangeValue<DateValue> | null>(() => {
    if (dateStart && dateEnd) {
        return {
            start: parseDate(dateStart),
            end: parseDate(dateEnd)
        }
    }
    return null
})
    useEffect(()=>{
        if(!range) return
        apiService.patch('/cart/update/',JSON.stringify({
            start_date: range.start.toString(),
            end_date: range.end.toString()
        }))
    },[range])
    return (
        <DateRangePicker 
            className="max-w-xs" 
            label="Выбор даты" 
            value={range}
            onChange={(value)=>{setRange(value)}}
        />
    )

}