const baseurl="http://43.254.1.229:8002/"
// const baseurl="https://43.254.1.229:8054/"
const userid='xinxiang'
const cityCode='410700'
const areaid='999120'
const path='000000_999100_999120'
const cityName="新乡";
function sayHi(){
 console.log('hi');
}
function colorPM25(AQI){
		if (AQI==null){
            return "#9d9d9d";
        }else {
            var a = "#7eff00";
			if (AQI<0){
			    a = "#9d9d9d";
			}else if (AQI<35){
                a = "#7eff00";
            }else if (AQI<75){
                a = "#ffff00";
            }else if (AQI<115){
                a = "#ff8200";
            }else if (AQI<150){
                a = "#ff0000";
            }else if (AQI<250){
                a = "#9d0a53";
            }else{
               a = "#7b0223";
            }
            return a;
        }
	}
	function colorPM10(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<50){
	            a = "#7eff00";
	        }else if (AQI<150){
	            a = "#ffff00";
	        }else if (AQI<250){
	            a = "#ff8200";
	        }else if (AQI<350){
	            a = "#ff0000";
	        }else if (AQI<420){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorSO2(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<150){
	            a = "#7eff00";
	        }else if (AQI<500){
	            a = "#ffff00";
	        }else if (AQI<650){
	            a = "#ff8200";
	        }else if (AQI<800){
	            a = "#ff0000";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorNO2(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<100){
	            a = "#7eff00";
	        }else if (AQI<200){
	            a = "#ffff00";
	        }else if (AQI<700){
	            a = "#ff8200";
	        }else if (AQI<1200){
	            a = "#ff0000";
	        }else if (AQI<2340){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorO3(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<160){
	            a = "#7eff00";
	        }else if (AQI<200){
	            a = "#ffff00";
	        }else if (AQI<300){
	            a = "#ff8200";
	        }else if (AQI<400){
	            a = "#ff0000";
	        }else if (AQI<800){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorCO(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<5){
	            a = "#7eff00";
	        }else if (AQI<10){
	            a = "#ffff00";
	        }else if (AQI<35){
	            a = "#ff8200";
	        }else if (AQI<60){
	            a = "#ff0000";
	        }else if (AQI<90){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
	function colorAQI(AQI){
		if (AQI==null){
	        return "#9d9d9d";
	    }else {
	        var a = "#7eff00";
	        if (AQI<0){
	            a = "#9d9d9d";
	        }else if (AQI<51){
	            a = "#7eff00";
	        }else if (AQI<101){
	            a = "#ffff00";
	        }else if (AQI<151){
	            a = "#ff8200";
	        }else if (AQI<201){
	            a = "#ff0000";
	        }else if (AQI<301){
	            a = "#9d0a53";
	        }else{
	           a = "#7b0223";
	        }
	        return a;
	    }
	}
function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
export default{
	baseurl,
	userid,
	cityCode,
	areaid,
	path,
	friendlyDate,
	sayHi,
	colorAQI,
	colorCO,
	colorO3,
	colorNO2,
	colorSO2,
	colorPM10,
	colorPM25
}
