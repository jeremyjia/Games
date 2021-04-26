package com.pbz.demo.hello.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
@Controller
@RequestMapping(value = "/calendar", method = RequestMethod.GET)
@Api(tags = "日历接口")
public class CalendarController {

	@ApiOperation(value = "通过输入日期获取日历信息")
	@RequestMapping(value = "/getDateInfo")
	@ResponseBody
	public Map<String, Object> getDateInfo(
			@ApiParam(name = "date", value = "yyyy-MM-dd", required = true) @RequestParam(name = "date") String date)
			throws Exception {

		Date inDate = verifyParameter(date);

		Map<String, Object> calendar = new HashMap<String, Object>(5);
		// Date
		SimpleDateFormat Dateformat = new SimpleDateFormat("yyyy-MM-dd");
		calendar.put("Date", Dateformat.format(inDate));
		// DayOfYear
		SimpleDateFormat DayOfYearformat = new SimpleDateFormat("D");
		calendar.put("DayOfYear", DayOfYearformat.format(inDate));
		// Week
		SimpleDateFormat Weekformat = new SimpleDateFormat("E");
		calendar.put("Week", Weekformat.format(inDate));

		return calendar;
	}

	@ApiOperation(value = "获取当前时间")
	@RequestMapping(value = "/getCurrentTime")
	@ResponseBody
	public Map<String, Object> getTime() throws Exception {

		Map<String, Object> calendar = new HashMap<String, Object>(2);
		Calendar c = Calendar.getInstance();
		SimpleDateFormat Timeformat = new SimpleDateFormat("HH:mm:ss");
		calendar.put("Time", Timeformat.format(c.getTime()));
		SimpleDateFormat Zoneformat = new SimpleDateFormat("z");
		calendar.put("Zone", Zoneformat.format(c.getTime()));

		return calendar;
	}

	@ApiOperation(value = "获取当期日期")
	@RequestMapping(value = "/getCurrentDate")
	@ResponseBody
	public Map<String, Object> getDate() throws Exception {

		Map<String, Object> calendar = new HashMap<String, Object>(2);
		Calendar c = Calendar.getInstance();
		SimpleDateFormat Dateformat = new SimpleDateFormat("yyyy-MM-dd");
		calendar.put("Date", Dateformat.format(c.getTime()));
		SimpleDateFormat DayOfYearformat = new SimpleDateFormat("D");
		calendar.put("DayOfYear", DayOfYearformat.format(c.getTime()));

		return calendar;

	}

	@ApiOperation(value = "获取当期星期")
	@RequestMapping(value = "/getCurrentWeek")
	@ResponseBody
	public Map<String, Object> getWeek() throws Exception {

		Map<String, Object> calendar = new HashMap<String, Object>(2);
		Calendar c = Calendar.getInstance();
		SimpleDateFormat Weekformat = new SimpleDateFormat("E");
		calendar.put("Week", Weekformat.format(c.getTime()));
		SimpleDateFormat WeekOfYearformat = new SimpleDateFormat("w");
		calendar.put("WeekOfYear", WeekOfYearformat.format(c.getTime()));

		return calendar;

	}

	private Date verifyParameter(String date) throws Exception {

		if (date == null || date.trim().length() == 0) {
			throw new Exception("Parameter is null.");
		}

		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		try {
			format.setLenient(false);
			return format.parse(date);
		} catch (ParseException e) {
			throw new Exception("Parameter is invalid." + e.getMessage());
		}
	}
}
