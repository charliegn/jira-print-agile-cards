/*WebFont.load({
	custom: {
        families: ['Nanum Gothic'],
        urls: ['//fonts.googleapis.com/earlyaccess/nanumgothic.css']
    }
});*/
document.addEventListener('DOMSubtreeModified', function(e) {
	changeStyle();
});

window.addEventListener('storage', function(e) {
  changeStyle();
});

const title_size_config = {
	"s":{
		"fontSize": "1rem",
		"maxHeight": "150px",
		"margin": "10px 0",
		"itemHeight": "233px"
	},
	"m":{
		"fontSize": "1.3rem",
		"maxHeight": "150px",
		"margin": "10px 0",
		"itemHeight": "233px"
	},
	"l":{
		"fontSize": "1.5rem",
		"maxHeight": "150px",
		"margin": "10px 0",
		"itemHeight": "233px"
	},
	"xl":{
		"fontSize": "1.75rem",
		"maxHeight": "107px",
		"margin": "20px 0",
		"itemHeight": "250px"
	}
}

const component_color = {
	"Default": "000000", // black
	// "None": "FFFFFF", // white
	"None": "333333", // dark-gray
	"BizAPI": "800080", // purple
	"CLI": "2c45ff", // blue
	"Business UI": "008080", // teal
	"Exchange UI": "008080", // teal

	"ExoSense Pipeline": "ffcb05", // yellow
	"ExoSense UI": "FFA500", // orange
	"ExoSense Insights": "ff00ff", // fuchsia
	"ExoSense API": "87ceeb", // skyblue"
	"ExoSense DevOps": "008000", // pink

	"Solution UI": "008080", // teal
}

function changeStyle(){
	chrome.storage.sync.get({
		favoriteColor: 'blue',
		titleSize: 'm',
		ticketType: 'default'
	}, function(items) {
		//console.log(items.favoriteColor);
		var ghx_card = document.getElementsByClassName('ghx-card');
		//console.log("ghx_card.length: "+ghx_card);
		for(var i=0, len=ghx_card.length; i<len; i++)
    {
    	//console.log("#" + items.favoriteColor);
			//console.log(items.titleSize + "rem");

			// ghx_card[i].style.borderColor = "#" + items.favoriteColor;
				const componentName = ghx_card[i].getElementsByClassName('ghx-card-xfield-value')[1].innerText // ExoSense UI

				// Now assign a border color according to component type
				ghx_card[i].style.borderColor = "#" + component_color[componentName];
				ghx_card[i].style.padding = "10px";

				// Remove the component name if no component has been assigned.
				if (componentName === "None" || !Object.keys(component_color).includes(componentName)) {
					ghx_card[i].getElementsByClassName('ghx-card-xfield-value')[1].innerText = '';
					ghx_card[i].style.borderWidth = "2px";
					ghx_card[i].style.padding = "15px";
				}

				// if (Object.keys(component_color).indexOf(componentName) < 0) {
				// 	console.log('componentName', componentName);
				// 	ghx_card[i].style.borderColor = "#" + component_color.Default;
				// 	ghx_card[i].style.borderWidth = "1px";
				// }

        //title setting
        var ghx_card_summary = ghx_card[i].getElementsByClassName("ghx-card-summary")[0];
        //console.log(title_size_config[items.titleSize].fontSize);
        ghx_card_summary.style.fontSize = title_size_config[items.titleSize].fontSize;
        ghx_card_summary.style.maxHeight = title_size_config[items.titleSize].maxHeight;
        ghx_card_summary.style.margin = title_size_config[items.titleSize].margin;
        ghx_card[i].style.height = title_size_config[items.titleSize].itemHeight;
    }

    //ticket type setting
    var body_class_name = "ghx-print-card-body";
   	if( body_class_name.indexOf("ghx-print-" + items.ticketType)  == -1 ){
   		document.getElementById("jira").className = body_class_name + " ghx-print-" + items.ticketType;
   	}



	});
}