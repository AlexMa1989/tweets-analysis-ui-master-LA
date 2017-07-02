// @Date    : 2017-06-30 18:55:01
// @Author  : Chao Ma (cma1@kent.edu)
// @Link    : https://hijiangtao.github.io/
// @Version : $Id$

(function(){

    'use strict';

    angular
    .module('locationDataUi')
    .controller('MainController', MainController);

    function MainController($scope, leafletDrawEvents, MapQueryService) {


        var drawnItems = new L.FeatureGroup();

        angular.extend($scope, {
            map: {
                tweets: {
                    lat: 34.04320145,
                    lng: -118.2447739,
                    zoom: 15
                },

                drawOptions: {
                    position: "bottomright",
                    draw: {
                        polyline: {
                            metric: false
                        },
                        polygon: {
                            metric: false,
                            showArea: true,
                            drawError: {
                                color: '#b00b00',
                                timeout: 1000
                            },
                            shapeOptions: {
                                color: '#315f96',
                                clickable: true
                            }
                        },
                        circle: {
                            showArea: true,
                            metric: false,
                            shapeOptions: {
                                color: '#315f96',
                                clickable: true
                            }
                        },
                        marker: true
                    },
                    edit: {
                        featureGroup: drawnItems,
                        remove: true
                    }
                }
            }

        });

        function getColor(d) {
            return d > 1000 ? '#800026' :
            d > 500  ? '#BD0026' :
            d > 200  ? '#E31A1C' :
            d > 100  ? '#FC4E2A' :
            d > 50   ? '#FD8D3C' :
            d > 20   ? '#FEB24C' :
            d > 10   ? '#FED976' :
                       '#FFEDA0';
                  };

        function getTopNWords(text, n)
        {
            var wordRegExp = /\w+(?:'\w{1,2})?/g;
            var words = {};
            var matches;
            while ((matches = wordRegExp.exec(text)) != null)
            {
                var word = matches[0].toLowerCase();
                if (typeof words[word] == "undefined")
                {
                    words[word] = 1;
                }
                else
                {
                    words[word]++;
                }
            }
            var wordList = [];
            for (var word in words)
            {
                if (words.hasOwnProperty(word))
                {
                    wordList.push([word, words[word]]);
                }
            }
            wordList.sort(function(a, b) { return b[1] - a[1]; });
            var topWords = [];
            for (var i = 0; i < n; i++)
            {
                topWords.push(wordList[i][0]);
            }
            return topWords;
        }

        function getTopNFrenquency(text, n)
        {
            var wordRegExp = /\w+(?:'\w{1,2})?/g;
            var words = {};
            var matches;
            while ((matches = wordRegExp.exec(text)) != null)
            {
                var word = matches[0].toLowerCase();
                if (typeof words[word] == "undefined")
                {
                    words[word] = 1;
                }
                else
                {
                    words[word]++;
                }
            }
            var wordList = [];
            for (var word in words)
            {
                if (words.hasOwnProperty(word))
                {
                    wordList.push([word, words[word]]);
                }
            }
            wordList.sort(function(a, b) { return b[1] - a[1]; });
            var topFrenquency = [];
            for (var i = 0; i < n; i++)
            {
                topFrenquency.push(wordList[i][1]);
            }
            return topFrenquency;
        }

        function getTimeFrequency(arr)
        {

          var a = [], b = [], prev;

             arr.sort();
             for ( var i = 0; i < arr.length; i++ ) {
                 if ( arr[i] !== prev ) {
                     a.push(arr[i].replace(/\//g, "-"));
                     b.push(1);
                 } else {
                     b[b.length-1]++;
                 }
                 prev = arr[i];
             }

            var obj = a.map(function(e,i){return{"date":e,"number":b[i]}});

            var objrefine = [];

            for(var j=0;j<obj.length;j++){
                if (obj[j].date !== '06')
                {
                    if (obj[j].date !== 'Sun')
                    {

                        objrefine.push(obj[j]);

                    }
                }
              }

             return objrefine;
        }

        function getTimeAndWordsFrequency(arr)
        {

          var a = [], b = [], time = [], keywords = [], prev;

             arr.sort();
             for ( var i = 0; i < arr.length; i++ ) {
                 if ( arr[i] !== prev ) {
                     a.push(arr[i].replace(/\//g, "-"));
                     b.push(1);
                 } else {
                     b[b.length-1]++;
                 }
                 prev = arr[i];
             }

             for (var i = 0; i < a.length; i++) {
                var words = a[i].split(" ");
                time.push(words[0]);
                keywords.push(words[1]);
            }

            var arrayOfObjects1 = [];
            var arrayOfObjects = [];
            for(var i=0; i<b.length; i++){
                var obj = {};
                obj['date'] = time[i]; 
                obj[keywords[i]] = b[i];  
                arrayOfObjects1.push(obj);
            }

            for(var j=0;j<arrayOfObjects1.length;j++){
                if (arrayOfObjects1[j].date !== '06')
                {
                    if (arrayOfObjects1[j].date !== 'Sun')
                    {

                        arrayOfObjects.push(arrayOfObjects1[j]);

                    }
                }
              }


            for(var j=0;j<arrayOfObjects.length;j++){
              var current = arrayOfObjects[j];
              for(var i=j+1;i<arrayOfObjects.length;i++){
                if(current.date === arrayOfObjects[i].date){
                Object.assign(current, arrayOfObjects[i]);
                arrayOfObjects.splice(i,1);
                i++;
                }
    
                }
              }

              for(var j=0;j<arrayOfObjects.length;j++){
              var current = arrayOfObjects[j];
              for(var i=j+1;i<arrayOfObjects.length;i++){
                if(current.date === arrayOfObjects[i].date){
                Object.assign(current, arrayOfObjects[i]);
                arrayOfObjects.splice(i,1);
                i++;
                }
    
                }
              }

              for(var j=0;j<arrayOfObjects.length;j++){
              var current = arrayOfObjects[j];
              for(var i=j+1;i<arrayOfObjects.length;i++){
                if(current.date === arrayOfObjects[i].date){
                Object.assign(current, arrayOfObjects[i]);
                arrayOfObjects.splice(i,1);
                i++;
                }
    
                }
              }

              for(var j=0;j<arrayOfObjects.length;j++){
              var current = arrayOfObjects[j];
              for(var i=j+1;i<arrayOfObjects.length;i++){
                if(current.date === arrayOfObjects[i].date){
                Object.assign(current, arrayOfObjects[i]);
                arrayOfObjects.splice(i,1);
                i++;
                }
    
                }
              }


              var resultObjects = [];

              for(var j=0;j<arrayOfObjects.length;j++){
                if (arrayOfObjects[j].date !== 1)
                {
                    resultObjects.push(arrayOfObjects[j]);
                }
              }


              var finalObjects = [];
              var uniqueTime = [];

              uniqueTime = time.filter(function(item, pos, self) {
                    return self.indexOf(item) == pos;
                })


              for(var j=0;j<resultObjects.length;j++){

                var sortable = [];
                var obj = {};

                for (var keywords in resultObjects[j])
                    sortable.push([keywords, resultObjects[j][keywords]])

                sortable.sort(function(a, b) {
                    return b[1] - a[1]
                })


                sortable.forEach(function(data){
                    obj[data[0]] = data[1].toString()
                });

                finalObjects.push(obj);

              }

              finalObjects.sort(function(a, b){
                var keyA = new Date(a.date),
                    keyB = new Date(b.date);
                if(keyA < keyB) return -1;
                if(keyA > keyB) return 1;
                return 0;
            });

             return finalObjects;
        }

        function parseDate(input) {
        return Date.parse(input)/1000; 
        }

        function drawWordsTimeView(data)
        {
            var margin = {top: 10, right: 200, bottom: 60, left: 50},
                margin2 = { top: 150, right: 10, bottom: 20, left: 40 },
                width = 400,
                height = 150,
                height2 = 150;

            var parseDate1 = d3_3_5_5.time.format("%Y-%m-%d").parse;
            var bisectDate = d3_3_5_5.bisector(function(d) { return d.date; }).left;

            var xScale = d3_3_5_5.time.scale()
                .range([0, width]),

                xScale2 = d3_3_5_5.time.scale()
                .range([0, width]); 

            var yScale = d3_3_5_5.scale.linear()
                .range([height, 0]);

            var color = d3_3_5_5.scale.ordinal().range(["#48A36D",  "#72C39B",  "#7FC9BD",  "#7FBBCF",  "#809ECE",  "#9788CD",  "#B681BE",  "#D3779F",  "#E05A6D",  "#E2705C",  "#E39158", "#E29D58", "#E2AA59", "#E0B15B", "#DFB95C", "#DDC05E", "#DBC75F", "#E3CF6D", "#EAD67C", "#F2DE8A"]);  


            var xAxis = d3_3_5_5.svg.axis()
                .scale(xScale)
                .orient("bottom"),

                xAxis2 = d3_3_5_5.svg.axis() 
                .scale(xScale2)
                .orient("bottom");    

            var yAxis = d3_3_5_5.svg.axis()
                .scale(yScale)
                .orient("left");  

            var line = d3_3_5_5.svg.line()
                .interpolate("basis-open")
                .x(function(d) { return xScale(d.date); })
                .y(function(d) { return yScale(d.rating); })
                .defined(function(d) { return d.rating; });  // Hiding line value defaults of 0 for missing data

            var maxY; // Defined later to update yAxis

            var svg = d3_3_5_5.select("#wordsChart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom) //height + margin.top + margin.bottom
              .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Create invisible rect for mouse tracking
            svg.append("rect")
                .attr("width", width)
                .attr("height", height)                                    
                .attr("x", 0) 
                .attr("y", 0)
                .attr("id", "mouse-tracker")
                .style("fill", "white"); 

            //for slider part-----------------------------------------------------------------------------------
              
            var context = svg.append("g") // Brushing context box container
                .attr("transform", "translate(" + 0 + "," + 0 + ")")
                .attr("class", "context");

            //append clip path for lines plotted, hiding those part out of bounds
            svg.append("defs")
              .append("clipPath") 
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

            //end slider part----------------------------------------------------------------------------------- 
 
              color.domain(d3_3_5_5.keys(data[0]).filter(function(key) {
                return key !== "date"; 
              }));

              data.forEach(function(d) { 
                d.date = parseDate1(d.date);
              });

              var categories = color.domain().map(function(name) {

                return {
                  name: name, 
                  values: data.map(function(d) {
                    return {
                      date: d.date, 
                      rating: +(d[name]),
                      };
                  }),
                  visible: (name === "Unemployment" ? true : false)
                };
              });

              xScale.domain(d3_3_5_5.extent(data, function(d) { return d.date; }));

              yScale.domain([0, 100
              ]);

              xScale2.domain(xScale.domain());
             
             //for slider part-----------------------------------------------------------------------------------

             var brush = d3_3_5_5.svg.brush()//for slider bar at the bottom
                .x(xScale2) 
                .on("brush", brushed);

            var extent = brush.extent();

              context.append("g") // Create brushing xAxis
                  .attr("class", "x axis1")
                  .attr("transform", "translate(0," + height2 + ")")


              var contextArea = d3_3_5_5.svg.area() 
                .interpolate("monotone")
                .x(function(d) { return xScale2(d.date); }) // x is scaled to xScale2
                .y0(height2)
                .y1(0);

              context.append("path") // Path is created using svg.area details
                .attr("class", "area")
                .attr("d", contextArea(categories[0].values))
                .attr("fill", "#F1F1F2");
                
              //append the brush for the selection of subsection  
              context.append("g")
                .attr("class", "x brush")
                .call(brush)
                .selectAll("rect")
                .attr("height", height2)
                  .attr("fill", "#E6E7E8");  
              //end slider part-----------------------------------------------------------------------------------

              // draw line graph
              svg.append("g")
                  .attr("class", "x axis")
                  .attr("transform", "translate(0," + height + ")")
                  .call(xAxis);

              svg.append("g")
                  .attr("class", "y axis")
                  .call(yAxis)
                .append("text")
                  .attr("transform", "rotate(-90)")
                  .attr("y", 6)
                  .attr("x", -10)
                  .attr("dy", ".71em")
                  .style("text-anchor", "end")
                  .text("frequency");

              var issue = svg.selectAll(".issue")
                  .data(categories) // Select nested data and append to new svg group elements
                .enter().append("g")
                  .attr("class", "issue");   

              issue.append("path")
                  .attr("class", "line")
                  .style("pointer-events", "none")
                  .attr("id", function(d) {
                    return "line-" + d.name.replace(" ", "").replace("/", "");
                  })
                  .attr("d", function(d) { 
                    return d.visible ? line(d.values) : null;
                  })
                  .attr("clip-path", "url(#clip)")
                  .style("stroke", function(d) { return color(d.name); });

              // draw legend
              var legendSpace = 450 / categories.length; 

              issue.append("rect")
                  .attr("width", 10)
                  .attr("height", 10)                                    
                  .attr("x", width + (margin.right/3) - 15) 
                  .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace) - 5; })  // spacing
                  .attr("fill",function(d) {
                    return d.visible ? color(d.name) : "#F1F1F2";
                  })
                  .attr("class", "legend-box")

                  .on("click", function(d){
                    d.visible = !d.visible;

                    maxY = findMaxY(categories);
                    yScale.domain([0,maxY]); // Redefine yAxis domain based on highest y value of categories data with "visible"; true
                    svg.select(".y.axis")
                      .transition()
                      .call(yAxis);   

                    issue.select("path")
                      .transition()
                      .attr("d", function(d){
                        return d.visible ? line(d.values) : null; // If d.visible is true then draw line for this d selection
                      })

                    issue.select("rect")
                      .transition()
                      .attr("fill", function(d) {
                      return d.visible ? color(d.name) : "#F1F1F2";
                    });
                  })

                  .on("mouseover", function(d){

                    d3_3_5_5.select(this)
                      .transition()
                      .attr("fill", function(d) { return color(d.name); });

                    d3_3_5_5.select("#line-" + d.name.replace(" ", "").replace("/", ""))
                      .transition()
                      .style("stroke-width", 2.5);  
                  })

                  .on("mouseout", function(d){

                    d3_3_5_5.select(this)
                      .transition()
                      .attr("fill", function(d) {
                      return d.visible ? color(d.name) : "#F1F1F2";});

                    d3_3_5_5.select("#line-" + d.name.replace(" ", "").replace("/", ""))
                      .transition()
                      .style("stroke-width", 1.5);
                  })
                  
              issue.append("text")
                  .attr("x", width + (margin.right/3)) 
                  .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace); })
                  .text(function(d) { return d.name; }); 

              // Hover line 
              var hoverLineGroup = svg.append("g") 
                        .attr("class", "hover-line");

              var hoverLine = hoverLineGroup
                    .append("line")
                        .attr("id", "hover-line")
                        .attr("x1", 10).attr("x2", 10) 
                        .attr("y1", 0).attr("y2", height + 10)
                        .style("pointer-events", "none")
                        .style("opacity", 1e-6);

              var hoverDate = hoverLineGroup
                    .append('text')
                        .attr("class", "hover-text")
                        .attr("y", height - (height-40)) // hover date text position
                        .attr("x", width - 150) // hover date text position
                        .style("fill", "#E6E7E8");

              var columnNames = d3_3_5_5.keys(data[0])
                              .slice(1);

              var focus = issue.select("g")
                  .data(columnNames)
                .enter().append("g")
                  .attr("class", "focus"); 

              focus.append("text")
                    .attr("class", "tooltip")
                    .attr("x", width + 20) // position tooltips  
                    .attr("y", function (d, i) { return (legendSpace)+i*(legendSpace); });
              d3_3_5_5.select("#mouse-tracker")
              .on("mousemove", mousemove)
              .on("mouseout", function() {
                  hoverDate
                      .text(null) // on mouseout remove text for hover date

                  d3_3_5_5.select("#hover-line")
                      .style("opacity", 1e-6); // On mouse out making line invisible
              });

              function mousemove() { 
                  var mouse_x = d3_3_5_5.mouse(this)[0];
                  var graph_x = xScale.invert(mouse_x);
                  var format = d3_3_5_5.time.format('%b %Y');
                  
                  hoverDate.text(format(graph_x));
                  
                  d3_3_5_5.select("#hover-line") // select hover-line and changing attributes to mouse position
                      .attr("x1", mouse_x) 
                      .attr("x2", mouse_x)
                      .style("opacity", 1);

                  var x0 = xScale.invert(d3_3_5_5.mouse(this)[0]), 
                  i = bisectDate(data, x0, 1),
                  d0 = data[i - 1],
                  d1 = data[i],
                  d = x0 - d0.date > d1.date - x0 ? d1 : d0;

                  focus.select("text").text(function(columnName){

                     return (d[columnName]);
                  });
              };

              var timeChange;
              var timeChange1;
              var timeChange2;
              var timeChangeTable1 = document.getElementById('timeChange1');
              var timeChangeTable2 = document.getElementById('timeChange2');

              function brushed() {

                xScale.domain(brush.empty() ? xScale2.domain() : brush.extent());

                svg.select(".x.axis") // replot xAxis with transition when brush used
                      .transition()
                      .call(xAxis);

                maxY = findMaxY(categories); // Find max Y rating value categories data with "visible"; true

                timeChange = brush.extent();
                timeChange1 = timeChange[0].toString().substring(0, 25);
                timeChange2 = timeChange[1].toString().substring(0, 25);

                if (timeChangeTable1.children[0].rows.length === 1 && timeChangeTable2.children[0].rows.length === 1)
                            {
                                
                             timeChangeTable1.children[0].innerHTML += "<td>"+timeChange1+"</td>";
                             timeChangeTable2.children[0].innerHTML += "<td>"+timeChange2+"</td>";
                                        
                            }
                            else
                            {
      
                    
                              timeChangeTable1.children[0].rows[1].innerHTML = "<td>"+timeChange1 +"</td>" ;
                              timeChangeTable2.children[0].rows[1].innerHTML = "<td>"+timeChange2 +"</td>" ;
                                      
                            }


                yScale.domain([0,maxY]);
                
                svg.select(".y.axis") // Redraw yAxis
                  .transition()
                  .call(yAxis);   

                issue.select("path") // Redraw lines based on brush xAxis scale and domain
                  .transition()
                  .attr("d", function(d){
                      return d.visible ? line(d.values) : null;
                  });
                
              };

              
              function findMaxY(data){ 
                var maxYValues = data.map(function(d) { 
                  if (d.visible){
                    return d3_3_5_5.max(d.values, function(value) {
                      return value.rating; })
                  }
                });
                return d3_3_5_5.max(maxYValues);
              }

        }


        function charts(input,chart,title)
        {
            var data = MG.convert.date(input, 'date');

            MG.data_graphic({
                description: "",
                data: data,
                width: 280,
                height: 160,
                left: 10,
                target: document.getElementById(chart),
                x_accessor: 'date',
                y_accessor: 'number'
            });
        }


        function openNav() {
            document.getElementById("mySidenav").style.width = "300px";
        }

        function closeNav() {
            document.getElementById("mySidenav").style.width = "0";
        }

        function openNavUp() {
            document.getElementById("mySidenavUp").style.height = "230px";
        }

        function closeNavUp() {
            document.getElementById("mySidenavUp").style.height = "0";
        }

        function openTab(tabName) {
            var i;
            var x = document.getElementsByClassName("tab");
            for (i = 0; i < x.length; i++) {
               x[i].style.display = "none";  
            }
            document.getElementById(tabName).style.display = "block";  
        }


        $scope.openNav = openNav;
        $scope.closeNav = closeNav;
        $scope.openTab = openTab;
        $scope.openNavUp = openNavUp;
        $scope.closeNavUp = closeNavUp;



        function RadarChart(id, data, options) {
            var cfg = {
             w: 600, 
             h: 600,                
             margin: {top: 20, right: 20, bottom: 20, left: 20}, 
             levels: 3,            
             maxValue: 0,    
             labelFactor: 1.25,    
             wrapWidth: 60,        
             opacityArea: 0.35,    
             dotRadius: 4,        
             opacityCircles: 0.1,  
             strokeWidth: 2,      
             roundStrokes: false,  
             color: d3_3_5_5.scale.category10() 
            };
            
            if('undefined' !== typeof options){
              for(var i in options){
                if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
              }
            }
            
            var maxValue = Math.max(cfg.maxValue, d3_3_5_5.max(data, function(i){return d3_3_5_5.max(i.map(function(o){return o.value;}))}));
                
            var allAxis = (data[0].map(function(i, j){return i.keywords})),
                total = allAxis.length,          
                radius = Math.min(cfg.w/2, cfg.h/2),   
                Format = d3_3_5_5.format('%'),       
                angleSlice = Math.PI * 2 / total;   

            var rScale = d3_3_5_5.scale.linear()
                .range([0, radius])
                .domain([0, maxValue]);
                
            d3_3_5_5.select(id).select("svg").remove();
            
            var svg = d3_3_5_5.select(id).append("svg")
                    .attr("width",  cfg.w + cfg.margin.left + cfg.margin.right)
                    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
                    .attr("class", "radar"+id);
      
            var g = svg.append("g")
                    .attr("transform", "translate(" + (cfg.w/2 + cfg.margin.left) + "," + (cfg.h/2 + cfg.margin.top) + ")");
            
            var filter = g.append('defs').append('filter').attr('id','glow'),
                feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
                feMerge = filter.append('feMerge'),
                feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
                feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');
            
            var axisGrid = g.append("g").attr("class", "axisWrapper");
            
            axisGrid.selectAll(".levels")
               .data(d3_3_5_5.range(1,(cfg.levels+1)).reverse())
               .enter()
                .append("circle")
                .attr("class", "gridCircle")
                .attr("r", function(d, i){return radius/cfg.levels*d;})
                .style("fill", "#CDCDCD")
                .style("stroke", "#CDCDCD")
                .style("fill-opacity", cfg.opacityCircles)
                .style("filter" , "url(#glow)");

            axisGrid.selectAll(".axisLabel")
               .data(d3_3_5_5.range(1,(cfg.levels+1)).reverse())
               .enter().append("text")
               .attr("class", "axisLabel")
               .attr("x", 4)
               .attr("y", function(d){return -d*radius/cfg.levels;})
               .attr("dy", "0.4em")
               .style("font-size", "10px")
               .attr("fill", "#737373")
               .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

            var axis = axisGrid.selectAll(".axis")
                .data(allAxis)
                .enter()
                .append("g")
                .attr("class", "axis");
            axis.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
                .attr("class", "line")
                .style("stroke", "white")
                .style("stroke-width", "2px");

            axis.append("text")
                .attr("class", "legend")
                .style("font-size", "11px")
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
                .text(function(d){return d})
                .call(wrap, cfg.wrapWidth);

            
            var radarLine = d3_3_5_5.svg.line.radial()
                .interpolate("linear-closed")
                .radius(function(d) { return rScale(d.value); })
                .angle(function(d,i) {  return i*angleSlice; });
                
            if(cfg.roundStrokes) {
                radarLine.interpolate("cardinal-closed");
            }
                          
            var blobWrapper = g.selectAll(".radarWrapper")
                .data(data)
                .enter().append("g")
                .attr("class", "radarWrapper");
                      
            blobWrapper
                .append("path")
                .attr("class", "radarArea")
                .attr("d", function(d,i) { return radarLine(d); })
                .style("fill", function(d,i) { return cfg.color(i); })
                .style("fill-opacity", cfg.opacityArea)
                .on('mouseover', function (d,i){
                    d3_3_5_5.selectAll(".radarArea")
                        .transition().duration(200)
                        .style("fill-opacity", 0.1); 
                    //Bring back the hovered over blob
                    d3_3_5_5.select(this)
                        .transition().duration(200)
                        .style("fill-opacity", 0.7);    
                })
                .on('mouseout', function(){
                    //Bring back all blobs
                    d3_3_5_5.selectAll(".radarArea")
                        .transition().duration(200)
                        .style("fill-opacity", cfg.opacityArea);
                });
                
            //Create the outlines   
            blobWrapper.append("path")
                .attr("class", "radarStroke")
                .attr("d", function(d,i) { return radarLine(d); })
                .style("stroke-width", cfg.strokeWidth + "px")
                .style("stroke", function(d,i) { return cfg.color(i); })
                .style("fill", "none")
                .style("filter" , "url(#glow)");        
            
            //Append the circles
            blobWrapper.selectAll(".radarCircle")
                .data(function(d,i) { return d; })
                .enter().append("circle")
                .attr("class", "radarCircle")
                .attr("r", cfg.dotRadius)
                .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                .style("fill", function(d,i,j) { return cfg.color(j); })
                .style("fill-opacity", 0.8);
            
            //Wrapper for the invisible circles on top
            var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
                .data(data)
                .enter().append("g")
                .attr("class", "radarCircleWrapper");
                
            //Append a set of invisible circles on top for the mouseover pop-up
            blobCircleWrapper.selectAll(".radarInvisibleCircle")
                .data(function(d,i) { return d; })
                .enter().append("circle")
                .attr("class", "radarInvisibleCircle")
                .attr("r", cfg.dotRadius*1.5)
                .attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
                .attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
                .style("fill", "none")
                .style("pointer-events", "all")
                .on("mouseover", function(d,i) {
                    newX =  parseFloat(d3_3_5_5.select(this).attr('cx')) - 10;
                    newY =  parseFloat(d3_3_5_5.select(this).attr('cy')) - 10;
                            
                    tooltip
                        .attr('x', newX)
                        .attr('y', newY)
                        .text(Format(d.value))
                        .transition().duration(200)
                        .style('opacity', 1);
                })
                .on("mouseout", function(){
                    tooltip.transition().duration(200)
                        .style("opacity", 0);
                });
                
            //Set up the small tooltip for when you hover over a circle
            var tooltip = g.append("text")
                .attr("class", "tooltip")
                .style("opacity", 0);
            
  
            function wrap(text, width) {
              text.each(function() {
                var text = d3_3_5_5.select(this),
                    words = text.text().split(/\s+/).reverse(),
                    word,
                    line = [],
                    lineNumber = 0,
                    lineHeight = 1.4,
                    y = text.attr("y"),
                    x = text.attr("x"),
                    dy = parseFloat(text.attr("dy")),
                    tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
                    
                while (word = words.pop()) {
                  line.push(word);
                  tspan.text(line.join(" "));
                  if (tspan.node().getComputedTextLength() > width) {
                    line.pop();
                    tspan.text(line.join(" "));
                    line = [word];
                    tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
                  }
                }
              });
            }
            
        }

        $scope.RadarChart = RadarChart;

        function openTabs (evt, tabName) {
          var i, x, tablinks;
          x = document.getElementsByClassName("tabs");
          for (i = 0; i < x.length; i++) {
              x[i].style.display = "none";
          }
          tablinks = document.getElementsByClassName("tablink");
          for (i = 0; i < x.length; i++) {
              tablinks[i].className = tablinks[i].className.replace("w3-red", "");
          }
          document.getElementById(tabName).style.display = "block";
          evt.currentTarget.className += " w3-red";
        }

        $scope.openTabs = openTabs;



        var layerList = [];
        var clusterList = [];
        var clickClusterList = [];
        var clusterPanel = [];
        var markeri = 0;
        var clusteri = 0;
        var clusterPi = 0;
        var idPool = [];
        var groupMarkerByTweets = L.layerGroup();
        var groupMarkerByText = L.layerGroup();

        var handle = {
            created: function(e,leafletEvent, leafletObject, model, modelName) {
                drawnItems.addLayer(leafletEvent.layer);

                if (leafletEvent.layerType === 'circle') {
                    MapQueryService.circleQuery(leafletEvent.layer._latlng.lat, leafletEvent.layer._latlng.lng, leafletEvent.layer._mRadius)
                    .then(function(result) {

                        queryMap(result);
                    
                        
                    });
                }

                else if (leafletEvent.layerType === "rectangle") {
                      MapQueryService.polyQuery(leafletEvent.layer._latlngs)

                      .then( function(result) {

                                  if (result.status == "200") {
                                    console.log("Query Successful");
                                    queryMap(result);
                                  } else {
                                    console.log(result.status + " error", result.statusText)
                                  }
                      });

                    } else if (leafletEvent.layerType === "polygon") {
                      //Then query
                      MapQueryService.polyQuery(leafletEvent.layer._latlngs[0])

                      .then( function(result) {
                                  if (result.status == "200") {
                                    console.log("Query Successful");
                                    queryMap(result);
                                  } else {
                                    console.log(result.status + " error", result.statusText)
                                  }
                      });
                    }



            function queryMap(result){
                        //Draw Here
                        //console.log(result);

                        var keywords = {};
                        var markerInUserK = {};
                        var times = {};
                        var timesArray = [];
                        var keywordsJudge = [];
                        var text = [];
                        var filterBytimeResult = [];
                        var filterBytimeResultSize1 = [];
                        var filterBytimeResultSize2 = [];
                        var filterBytimeResultSize3 = [];

                        var datefrom = parseDate(document.getElementById('datefrom').value);
                        var dateto = parseDate(document.getElementById('dateto').value);
                        for (var i=0; i<result.data.length; i++){
                            var datefromdata = parseDate(result.data[i].created_at);
                            if (dateto > datefromdata && datefrom < datefromdata)  {
                                filterBytimeResult.push(result.data[i]);
                            }
                        }           

                        if (document.getElementById('datefrom').value !== "" || document.getElementById('dateto').value !== "")

                        {

                            var cluster = L.markerClusterGroup({
                                zoomToBoundsOnClick: false
                            });

                            var groupMarker = L.layerGroup();

                            for (var i=0; i<filterBytimeResult.length; i++){
                                var size = filterBytimeResult[i].weight;
                                if (size > 0 && size <= 0.6)  {
                                    filterBytimeResultSize1.push(filterBytimeResult[i]);
                                }
                                else if (size > 0.6 && size <= 1.3)  {
                                    filterBytimeResultSize2.push(filterBytimeResult[i]);
                                }
                                else {
                                    filterBytimeResultSize3.push(filterBytimeResult[i]);
                                }
                            }



                            for (var i = filterBytimeResultSize1.length - 1; i >= 0; i--) {
                            var myIcon = L.icon({
                                iconUrl: '/images/blue3.png',
                                iconSize: [5, 5],
                                iconAnchor: [5, 5]
                            });

                            //var markers = L.marker([result.data[i].loc.coordinates[1], result.data[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(result.data[i].keywords.toString()).openPopup();
                            var markers = L.marker([filterBytimeResultSize1[i].loc.coordinates[1], filterBytimeResultSize1[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterBytimeResultSize1[i].text);

                            groupMarker.addLayer(markers);

                            
                            }

                             for (var i = filterBytimeResultSize2.length - 1; i >= 0; i--) {
                            var myIcon = L.icon({
                                iconUrl: '/images/blue3.png',
                                iconSize: [8, 8],
                                iconAnchor: [8, 8]
                            });

                            //var markers = L.marker([result.data[i].loc.coordinates[1], result.data[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(result.data[i].keywords.toString()).openPopup();
                            var markers = L.marker([filterBytimeResultSize2[i].loc.coordinates[1], filterBytimeResultSize2[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterBytimeResultSize2[i].text);

                            groupMarker.addLayer(markers);

                            
                            }

                             for (var i = filterBytimeResultSize3.length - 1; i >= 0; i--) {
                            var myIcon = L.icon({
                                iconUrl: '/images/blue3.png',
                                iconSize: [10, 10],
                                iconAnchor: [10, 10]
                            });

                            //var markers = L.marker([result.data[i].loc.coordinates[1], result.data[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(result.data[i].keywords.toString()).openPopup();
                            var markers = L.marker([filterBytimeResultSize3[i].loc.coordinates[1], filterBytimeResultSize3[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterBytimeResultSize3[i].text);

                            groupMarker.addLayer(markers);

                            
                            }


                            ////////////////////////////////////////////////----------////////////////////////


                            for (var i = filterBytimeResult.length - 1; i >= 0; i--) {

                            var markersForCluster = L.marker([filterBytimeResult[i].loc.coordinates[1], filterBytimeResult[i].loc.coordinates[0]]).bindPopup(filterBytimeResult[i]);

                            //markers1 for cluster click popup of time
                            cluster.addLayer(markersForCluster);

                            keywordsJudge.push(filterBytimeResult[i].keywords.toString());
                            keywords += ' ' + filterBytimeResult[i].keywords.toString();
                            markerInUserK += ' ' + filterBytimeResult[i].username.toString();

                            times += ' ' + filterBytimeResult[i].created_at.toString();
                            timesArray.push(filterBytimeResult[i].created_at.toString());
                            text.push(filterBytimeResult[i].text.toString());
                            }

                            /////////////////////////////////////draw charts for query////////////////////////////////
                            var timeArray = times.split(' ');
                            var arrayOnlyMonth = [];

                            for(var i = 2; i < timeArray.length; i += 2) {  // take every second element
                                arrayOnlyMonth.push(timeArray[i]);
                            }

                            var timeFrequency = getTimeFrequency(arrayOnlyMonth);
                            var chart = 'chart1';
                            var title = "tweets keywords frequency";

                            charts(timeFrequency,chart,title);

                            //////////////////////////////////////////////////////////////////////////////////////////


                            /////////////////////////////////////generate keywords and frequency////////////////////////////////


                            var topWords = getTopNWords(keywords, 20);
                            var topUsername = getTopNWords(markerInUserK, 20);
                            var topFrenquency = getTopNFrenquency (keywords, 20)
                            var topUFrenquency = getTopNFrenquency (markerInUserK, 20)

                            var keywordsTable = document.getElementById('keywords');

                            if (keywordsTable.children[0].rows.length === 1)
                            {
                                for (var i =  0; i <= topWords.length - 1; i++)
                                     {
                                      keywordsTable.children[0].innerHTML += "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                        
                                     }
                            }
                            else
                            {
      
                                for (var i =  0; i <= topWords.length - 1; i++)
                                     {
                                      keywordsTable.children[0].rows[i].innerHTML = "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                     }
                            }

                            var KeywordsTableU = document.getElementById('userNameS');

                                if (KeywordsTableU.children[0].rows.length === 1)
                                {
                                    for (var i =  0; i <= topUsername.length - 1; i++)
                                         {
                                          KeywordsTableU.children[0].innerHTML += "<td>"+topUsername[i]+"</td>" + "<td>"+topUFrenquency[i]+"</td>";
                                            
                                         }
                                }
                                else
                                {
          
                                    for (var i =  0; i <= topUsername.length - 1; i++)
                                         {
                                          KeywordsTableU.children[0].rows[i].innerHTML = "<td>"+topUsername[i]+"</td>" + "<td>"+topUFrenquency[i]+"</td>";
                                         }
                                }


                            //////////////////////////////////////////////////////////////////////////////////////////

                             /////////////////////////////////////get wholeKeywords from html ////////////////////////////////


                                    var tw = document.getElementById('keywords');
                          

                                    tw.onclick = function (event) {
                                        groupMarkerByTweets.clearLayers();
                                        event = event || window.event; //IE8
                                        var target = event.target || event.srcElement;
                                        var keywords = target.innerHTML.toString();
                                        var filterByKeywords = [];



                                        for (var i=0; i<filterBytimeResult.length; i++){
                                            var keywordfromdatas = filterBytimeResult[i].keywords.toString();
                                            if (keywords === keywordfromdatas)  {
                                                filterByKeywords.push(filterBytimeResult[i]);
                                            }
                                        }

                                        for (var i = filterByKeywords.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/green1.png',
                                            iconSize: [10, 10],
                                            iconAnchor: [10, 10]
                                        });

                                        var markers = L.marker([filterByKeywords[i].loc.coordinates[1], filterByKeywords[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywords[i].text);

                                        groupMarkerByTweets.addLayer(markers);

                                        
                                        }

                                        leafletObject.addLayer(groupMarkerByTweets);
                                    
                                    };


                            
                            //////////////////////////////////////////////////////////////////////////////////////////

                            /////////////////////////////////////generate tweets text ////////////////////////////////

                             var textTable = document.getElementById('text');
                             //console.log(text);

                            //console.log(keywordsTable.children[0].rows.length);

                            if (textTable.children[0].rows.length === 1)
                            {
                                for (var i =  0; i <= 100 - 1; i++)
                                     {
                                      textTable.children[0].innerHTML += "<td>"+text[i]+"</td>";
                                        
                                     }
                            }
                            else
                            {
      
                                for (var i =  0; i <= 100 - 1; i++)
                                     {
                                      textTable.children[0].rows[i].innerHTML = "<td>"+text[i]+"</td>" ;
                                     }
                            }
                            //////////////////////////////////////////////////////////////////////////////////////////

                             /////////////////////////////////////get text from html ////////////////////////////////


                                    var ta = document.getElementById('text');

                                    ta.onclick = function (event) {
                                        groupMarkerByText.clearLayers();
                                        event = event || window.event;
                                        var target = event.target || event.srcElement;
                                        var texts = target.innerHTML.toString().substring(0, 15);
                                        var filterByText = [];

                                        for (var i=0; i<filterBytimeResult.length; i++){
                                            var textfromdata = filterBytimeResult[i].text.toString().substring(0, 15);
                                            if (texts === textfromdata)  {
                                                filterByText.push(filterBytimeResult[i]);
                                            }
                                        }


                                        for (var i = filterByText.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/green1.png',
                                            iconSize: [10, 10],
                                            iconAnchor: [10, 10]
                                        });

                                        var markers = L.marker([filterByText[i].loc.coordinates[1], filterByText[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByText[i].text);

                                        groupMarkerByText.addLayer(markers);
     
                                        }
                                    

                                        leafletObject.addLayer(groupMarkerByText);
                                    
                                    };

                            
                            //////////////////////////////////////////////////////////////////////////////////////////

                             /////////////////////////////////////radar graph ////////////////////////////////


                                var margin = {top: 50, right: 50, bottom: 50, left: 50},
                                    width = Math.min(240, window.innerWidth - 10) - margin.left - margin.right,
                                    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                                        

                                var data2 = [];
                                var dataFinal = [];
                                var r_grouped = [];
                                var filterResult = [];

                                 for(var j=0;j<filterBytimeResult.length;j++){
                                    if (filterBytimeResult[j].weight !== "553mi")
                                    {
                                        filterResult.push(filterBytimeResult[j]);
                                    }
                                  }

                                filterResult.forEach(function (a, i) {
                                    if (!this[a.keywords]) {
                                        this[a.keywords] = { keywords: a.keywords, weight: []};

                                        r_grouped.push(this[a.keywords]);
                                    }
                                    this[a.keywords].weight.push(a.weight);
                                }, Object.create(null));

                                r_grouped.forEach( function (arrayItem)
                                {
                                    var obj = {};
                                    var x = arrayItem.weight;
                                    var sum = 0;
                                    var average = 0;
                                    var count = 0;

                                    for (i=0;i<x.length;i++)
                                    {
                                    sum += x[i];
                                    count++;
                                    }

                                    average = Math.round(sum/count * 100) / 100;

                                    obj['keywords'] = arrayItem.keywords;
                                    obj['value'] = average; 
                                    data2.push(obj);
                                });

                                data2.sort(function(a, b) {
                                    return b.value - a.value;
                                });

                                for (i = 0; i < 10; i++)
                                {
                                    dataFinal.push(data2[i]);
                                }


                                var color = d3_3_5_5.scale.ordinal()
                                    .range(["#EDC951","#CC333F","#00A0B0"]);
                                    
                                var radarChartOptions = {
                                  w: width,
                                  h: height,
                                  margin: margin,
                                  maxValue: 0.5,
                                  levels: 5,
                                  roundStrokes: true,
                                  color: color
                                };

                                RadarChart(".radarChart", [dataFinal], radarChartOptions);
                                    
                            
                            //////////////////////////////////////////////////////////////////////////////////////////


                        /////////////////////////////////////cluster generater////////////////////////////////


                          if (document.getElementById('checkCluster').checked)
                          {
                            leafletObject.addLayer(cluster);
                            var groupMarkerByWord = L.layerGroup();
                            var groupMarkerbyTime = L.layerGroup();
                            var groupMarkerbyUsername = L.layerGroup();
                            //leafletObject.addLayer(cluster1);


                            cluster.on('clusterclick', function (a) {
                            cluster.refreshClusters();
                            groupMarkerByWord.clearLayers();
                            groupMarkerbyTime.clearLayers();
                            groupMarkerbyUsername.clearLayers();



                                var clickCluster = a.layer.getAllChildMarkers();
                                var markerInKeywords = {};
                                var markerInUser = {};
                                var markerInTime = {};
                                var clusterArray = [];
                                
                                for (i = 0; i < clickCluster.length; i++) {
                                    markerInKeywords += ' ' + clickCluster[i]._popup._content.keywords.toString();
                                    markerInUser += ' ' + clickCluster[i]._popup._content.username.toString();
                                    markerInTime += ' ' + clickCluster[i]._popup._content.created_at.toString();
                                }

                                for (i = 0; i < clickCluster.length; i++) {

                                    clusterArray.push(clickCluster[i]._popup._content);
                                }

                                var topClusterWords = getTopNWords(markerInKeywords, 20);
                                var topCFrenquency = getTopNFrenquency (markerInKeywords, 20)
                                var topUsername = getTopNWords(markerInUser, 20);
                                var topUFrenquency = getTopNFrenquency (markerInUser, 20)

                                
                                var clusterTable = document.getElementById('clusterWords');

                                if (clusterTable.children[0].rows.length === 1)
                                {
                                    for (var i =  0; i <= topClusterWords.length - 1; i++)
                                         {
                                          clusterTable.children[0].innerHTML += "<td>"+topClusterWords[i]+"</td>" + "<td>"+topCFrenquency[i]+"</td>";
                                            
                                         }
                                }
                                else
                                {
          
                                    for (var i =  0; i <= topClusterWords.length - 1; i++)
                                         {
                                          clusterTable.children[0].rows[i].innerHTML = "<td>"+topClusterWords[i]+"</td>" + "<td>"+topCFrenquency[i]+"</td>";
                                         }
                                }

                                var clusterTableU = document.getElementById('userName');

                                if (clusterTableU.children[0].rows.length === 1)
                                {
                                    for (var i =  0; i <= topUsername.length - 1; i++)
                                         {
                                          clusterTableU.children[0].innerHTML += "<td>"+topUsername[i]+"</td>" + "<td>"+topUFrenquency[i]+"</td>";
                                            
                                         }
                                }
                                else
                                {
          
                                    for (var i =  0; i <= topUsername.length - 1; i++)
                                         {
                                          clusterTableU.children[0].rows[i].innerHTML = "<td>"+topUsername[i]+"</td>" + "<td>"+topUFrenquency[i]+"</td>";
                                         }
                                }


                            /////////////////////////////////////highlight cluster markers ////////////////////////////////

                            a.layer._icon.className = 'leaflet-marker-icon marker-cluster marker-cluster-large-change leaflet-zoom-animated leaflet-interactive';

                            var top1ClusterWords = getTopNWords(markerInKeywords, 1);
                            a.layer._icon.innerHTML = top1ClusterWords[0].toString();


                            //////////////////////////////////////////////////////////////////////////////////////////

                            /////////////////////////////////////get keywords from html ////////////////////////////////


                                    var t = document.getElementById('clusterWords');

                                    t.onclick = function (event) {
                                        groupMarkerByWord.clearLayers();

                                        event = event || window.event; //IE8
                                        var target = event.target || event.srcElement;
                                        var keywords = target.innerHTML.toString();
                                        var filterByKeywords = [];

                                        var filterByKeywordsSize1 = [];
                                        var filterByKeywordsSize2 = [];
                                        var filterByKeywordsSize3 = [];

                                        for (var i=0; i<clickCluster.length; i++){
                                            var keywordfromdata = clickCluster[i]._popup._content.keywords.toString();
                                            if (keywords === keywordfromdata)  {
                                                filterByKeywords.push(clickCluster[i]._popup._content);
                                            }
                                        }

                                        for (var i=0; i<filterByKeywords.length; i++){
                                            var size = filterByKeywords[i].weight;
                                            if (size > 0 && size <= 0.6)  {
                                                filterByKeywordsSize1.push(filterByKeywords[i]);
                                            }
                                            else if (size > 0.6 && size <= 1.3)  {
                                                filterByKeywordsSize2.push(filterByKeywords[i]);
                                            }
                                            else {
                                                filterByKeywordsSize3.push(filterByKeywords[i]);
                                            }
                                        }

                                        for (var i = filterByKeywordsSize1.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/blue3.png',
                                            iconSize: [3, 3],
                                            iconAnchor: [3, 3]
                                        });

                                        var markers = L.marker([filterByKeywordsSize1[i].loc.coordinates[1], filterByKeywordsSize1[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywordsSize1[i].text);

                                        groupMarkerByWord.addLayer(markers);

                                        
                                        }

                                         for (var i = filterByKeywordsSize2.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/blue3.png',
                                            iconSize: [5, 5],
                                            iconAnchor: [5, 5]
                                        });

                                        var markers = L.marker([filterByKeywordsSize2[i].loc.coordinates[1], filterByKeywordsSize2[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywordsSize2[i].text);

                                        groupMarkerByWord.addLayer(markers);

                                        
                                        }

                                         for (var i = filterByKeywordsSize3.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/blue3.png',
                                            iconSize: [8, 8],
                                            iconAnchor: [8, 8]
                                        });

                                        var markers = L.marker([filterByKeywordsSize3[i].loc.coordinates[1], filterByKeywordsSize3[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywordsSize3[i].text);

                                        groupMarkerByWord.addLayer(markers);

                                        
                                        }

                                        leafletObject.addLayer(groupMarkerByWord);
                                        clickClusterList.push(groupMarkerByWord._layers);
                                        
                                    
                                    };


                            
                            //////////////////////////////////////////////////////////////////////////////////////////

                            /////////////////////////////////////get userName from html ////////////////////////////////


                                    var t = document.getElementById('userName');

                                    t.onclick = function (event) {
                                        groupMarkerbyUsername.clearLayers();

                                        event = event || window.event; //IE8
                                        var target = event.target || event.srcElement;
                                        var userName = target.innerHTML.toString();
                                        var filterByuserName = [];

                                        for (var i=0; i<clickCluster.length; i++){
                                            var keywordfromdata = clickCluster[i]._popup._content.username.toString();
                                            if (userName === keywordfromdata)  {
                                                filterByuserName.push(clickCluster[i]._popup._content);
                                            }
                                        }

                                        for (var i = filterByuserName.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/red1.png',
                                            iconSize: [10, 10],
                                            iconAnchor: [10, 10]
                                        });
                                        var markers = L.marker([filterByuserName[i].loc.coordinates[1], filterByuserName[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByuserName[i].text);

                                        groupMarkerbyUsername.addLayer(markers);

                                        
                                        }

                                        leafletObject.addLayer(groupMarkerbyUsername);                                        
                                    
                                    };


                            
                            //////////////////////////////////////////////////////////////////////////////////////////

                            /////////////////////////////////////get time from html ////////////////////////////////


                                    var tm = document.getElementById('display');

                                    tm.onclick = function (event) {
                                        groupMarkerbyTime.clearLayers();

                                        event = event || window.event; //IE8
                                        var target = event.target || event.srcElement;
                                        var times1 = document.getElementById('times1').getElementsByTagName('td');
                                        var times11 = times1[0].innerHTML.toString();
                                        var times2 = document.getElementById('times2').getElementsByTagName('td');
                                        var times21 = times2[0].innerHTML.toString();
                                        var times = target.innerHTML.toString();
                                        var filterByclusterTimes = [];
                                        var filterByclusterTimesSize1 = [];
                                        var filterByclusterTimesSize2 = [];
                                        var filterByclusterTimesSize3 = [];

                                        var timefrom = parseDate(times11);
                                        var timeto = parseDate(times21);

                                        for (var i=0; i<clickCluster.length; i++){
                                            var datefromclusterdata = parseDate(clickCluster[i]._popup._content.created_at);
                                            if (timeto > datefromclusterdata && timefrom < datefromclusterdata)  {
                                                filterByclusterTimes.push(clickCluster[i]._popup._content);
                                            }
                                        }           
                                        

                                        for (var i=0; i<filterByclusterTimes.length; i++){
                                            var size = filterByclusterTimes[i].weight;
                                            if (size > 0 && size <= 0.6)  {
                                                filterByclusterTimesSize1.push(filterByclusterTimes[i]);
                                            }
                                            else if (size > 0.6 && size <= 1.3)  {
                                                filterByclusterTimesSize2.push(filterByclusterTimes[i]);
                                            }
                                            else {
                                                filterByclusterTimesSize3.push(filterByclusterTimes[i]);
                                            }
                                        } 


                                        for (var i = filterByclusterTimesSize1.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/red1.png',
                                            iconSize: [3, 3],
                                            iconAnchor: [3, 3]
                                        });

                                        var markers1 = L.marker([filterByclusterTimesSize1[i].loc.coordinates[1], filterByclusterTimesSize1[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByclusterTimesSize1[i].text);


                                        groupMarkerbyTime.addLayer(markers1);

                                        
                                        }

                                        for (var i = filterByclusterTimesSize2.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/red1.png',
                                            iconSize: [5, 5],
                                            iconAnchor: [5, 5]
                                        });

                                        var markers2 = L.marker([filterByclusterTimesSize2[i].loc.coordinates[1], filterByclusterTimesSize2[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByclusterTimesSize2[i].text);


                                        groupMarkerbyTime.addLayer(markers2);

                                        
                                        }


                                        for (var i = filterByclusterTimesSize3.length - 1; i >= 0; i--) {
                                        var myIcon = L.icon({
                                            iconUrl: '/images/red1.png',
                                            iconSize: [8, 8],
                                            iconAnchor: [8, 8]
                                        });

                                        var markers3 = L.marker([filterByclusterTimesSize3[i].loc.coordinates[1], filterByclusterTimesSize3[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByclusterTimesSize3[i].text);


                                        groupMarkerbyTime.addLayer(markers3);

                                        
                                        }

                                        leafletObject.addLayer(groupMarkerbyTime);
                                    
                                     };


                            
                            //////////////////////////////////////////////////////////////////////////////////////////

                            /////////////////////////////////////radar graph ////////////////////////////////


                                var margin = {top: 50, right: 50, bottom: 50, left: 50},
                                    width = Math.min(240, window.innerWidth - 10) - margin.left - margin.right,
                                    height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                                        
                                var data2 = [];
                                var dataFinal = [];
                                var r_grouped = [];
                                var filterResult = [];

                                for(var j=0;j<clusterArray.length;j++){
                                    if (clusterArray[j].weight !== "553mi")
                                    {
                                        filterResult.push(clusterArray[j]);
                                    }
                                  }

                                filterResult.forEach(function (a, i) {
                                    if (!this[a.keywords]) {
                                        this[a.keywords] = { keywords: a.keywords, weight: []};

                                        r_grouped.push(this[a.keywords]);
                                    }
                                    this[a.keywords].weight.push(a.weight);
                                }, Object.create(null));


                                r_grouped.forEach( function (arrayItem)
                                {
                                    var obj = {};
                                    var x = arrayItem.weight;
                                    var sum = 0;
                                    var average = 0;
                                    var count = 0;

                                    for (i=0;i<x.length;i++)
                                    {
                                    sum += x[i];
                                    count++;
                                    }

                                    average = Math.round(sum/count * 100) / 100;

                                    obj['keywords'] = arrayItem.keywords;
                                    obj['value'] = average; 
                                    data2.push(obj);
                                });

                                data2.sort(function(a, b) {
                                    return b.value - a.value;
                                });

                                for (i = 0; i < 10; i++)
                                {
                                    dataFinal.push(data2[i]);
                                }


                                var color = d3_3_5_5.scale.ordinal()
                                    .range(["#CC333F","#CC333F","#00A0B0"]);
                                    
                                var radarChartOptions = {
                                  w: width,
                                  h: height,
                                  margin: margin,
                                  maxValue: 0.5,
                                  levels: 5,
                                  roundStrokes: true,
                                  color: color
                                };
                                //Call function to draw the Radar chart
                                RadarChart(".radarChartCluster", [dataFinal], radarChartOptions);
                                    

                            
                            //////////////////////////////////////////////////////////////////////////////////////////


                                 var timeArray = markerInTime.split(' ');
                                 var keywordsArray = markerInKeywords.split(' ');
                                 var arrayOnlyMonth = [];
                                 var arrayOnlyWords = [];
                                 var arrayTimeAndWords = [];

                                 for(var i = 2; i < timeArray.length; i += 2) {  // take every second element
                                    arrayOnlyMonth.push(timeArray[i]);
                                }

                                for(var i = 2; i < keywordsArray.length; i += 1) {
                                    arrayOnlyWords.push(keywordsArray[i]);
                                }

                                for(var i = 0; i < arrayOnlyWords.length; i += 1) {
                                    arrayTimeAndWords.push(arrayOnlyMonth[i] + ' ' + arrayOnlyWords[i]);
                                }

                                var timeFrequency = getTimeFrequency(arrayOnlyMonth);
                                var chart = 'chart2'
                                var title = "cluster keywords frequency";

                                charts(timeFrequency,chart,title);

                                 var wordsAndTimeFrequency = getTimeAndWordsFrequency(arrayTimeAndWords);

                                 d3_3_5_5.select("#wordsChart").selectAll("svg").remove();

                                 drawWordsTimeView(wordsAndTimeFrequency);



                                ////////////////////////////////////////////Cluster Panel Area///////////////////////////////////////

                                
                                var check = jQuery.inArray( a.layer._leaflet_id, idPool )
                                idPool.push(a.layer._leaflet_id);


                                if(check === -1)
                                {

                                clusterPanel.push([a.layer,clickCluster]);

                                function hideList(i){
                                            $(clusterPanel[i][0]._icon).hide();

                                            for (var i=0; i <clickClusterList.length; i++)
                                           {

                                            for (var key in clickClusterList[i]) {
                                              $(clickClusterList[i][key]._icon).hide();
                                            }
                                           }
                                        }

                                 function showList(i){
                                                $(clusterPanel[i][0]._icon).show();

                                                for (var i=0; i <clickClusterList.length; i++)
                                               {

                                                for (var key in clickClusterList[i]) {
                                                  $(clickClusterList[i][key]._icon).show();
                                                }
                                               }

                                            }



                                var table = document.getElementById("myClusterTable");
                            
                                var row = table.insertRow(0);
                                var cell1 = row.insertCell(0);
                                var cell2 = row.insertCell(1);
                                var cell3 = row.insertCell(2);
                                var cell4 = row.insertCell(3);
                                var cell5 = row.insertCell(4);
                                cell1.width = 100;
                                cell1.innerHTML = "<span style='color:yellow; display:block; cursor:pointer; width:100%;' id ='panlight"+clusterPi+"'> Cluster"+clusterPi+"</span>";
                                cell2.innerHTML = "<span style='color:white;'>" +clickCluster.length + "tweets</span>";
                                // cell2.appendChild(hideShape);
                                cell3.innerHTML = "<button id ='panhide"+clusterPi+"'> hide </button>";
                                cell4.innerHTML = "<button id ='panshow"+clusterPi+"'> show </button>";
                                cell5.innerHTML = "<button id ='panremove"+clusterPi+"'> remove </button>";

                                $(".clusterPanel").find("button").click(function(event) {

                                var idName = this.id;

                                  //console.log(idName.substring(0, 4)); // or alert($(this).attr('id'));
                                  if (idName.substring(0, 4) === "panh")
                                  {
                                    hideList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "pans")
                                  {
                                    showList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "panr")
                                  {
                                    $(this).closest('tr').remove();
                                    hideList(idName.slice(-1));
                                  }
                                  event.stopImmediatePropagation();
                              });


                                ++clusterPi;

                              }


                                ////////////////////////////////////////////Cluster Panel Area///////////////////////////////////////



                                ////////////////////////////////////////////Test Area///////////////////////////////////////

                

                                ////////////////////////////////////////////Test Area///////////////////////////////////////


                            });
                                  
                        


                            ///////////////////////////////////////Cluster Control panel////////////////////////////////////////////

                             clusterList.push([cluster._featureGroup._layers,leafletEvent.layer._path,leafletEvent.layer,keywordsJudge,filterBytimeResult,text,timesArray]);

                               function hideList(i){
                                            $(clusterList[i][1]).hide();

                                            for (var key in clusterList[i][0]) {
                                              $(clusterList[i][0][key]._icon).hide();
                                            }

                                           for (var i=0; i <clickClusterList.length; i++)
                                           {

                                            for (var key in clickClusterList[i]) {
                                              $(clickClusterList[i][key]._icon).hide();
                                            }
                                           }
                                        }

                                   function showList(i){
                                                  $(clusterList[i][1]).show();

                                                  for (var key in clusterList[i][0]) {
                                                    $(clusterList[i][0][key]._icon).show();
                                                  }
                                              }

                                   function highLight(i){

                                   
                                               if ($(clusterList[i][1])[0].getAttribute('fill') == "red")
                                               {
                                                $(clusterList[i][2])[0].setStyle({fillColor: '#662d90'});
                                               }
                                               else
                                               {
                                                $(clusterList[i][2])[0].setStyle({fillColor: 'red'});
                                               }
                                               
                                            }

                                   function tableKeywords(i){

                                            var convertedArray = [];
                                            var keywords = $(clusterList[i][3]);

                                            for(var i = 0; i < keywords.length; ++i)
                                            {
                                             convertedArray.push(keywords[i]);
                                            }
                                            var groupWords = convertedArray.join(' ');

                                            /////////////////////////////////////generate keywords and frequency////////////////////////////////

                                             var topWords = getTopNWords(groupWords, 20);
                                              var topFrenquency = getTopNFrenquency (groupWords, 20)

                                              var keywordsTable = document.getElementById('keywords');

                                              if (keywordsTable.children[0].rows.length === 1)
                                              {
                                                  for (var i =  0; i <= topWords.length - 1; i++)
                                                       {
                                                        keywordsTable.children[0].innerHTML += "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                                          
                                                       }
                                              }
                                              else
                                              {
                        
                                                  for (var i =  0; i <= topWords.length - 1; i++)
                                                       {
                                                        keywordsTable.children[0].rows[i].innerHTML = "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                                       }
                                              }

                                              /////////////////////////////////////////////////////////////////////////////////////////////////////

                                           
                                        }


                                        var wordsClickLayerCluster = L.layerGroup();
                                        function wordsClick(i){
                                          wordsClickLayerCluster.clearLayers();

                                          var convertedArray = [];
                                          var keyyy = $(clusterList[i][4]);

                                          for(var i = 0; i < keyyy.length; ++i)
                                            {
                                             convertedArray.push(keyyy[i]);
                                            }


                                            var tw = document.getElementById('keywords');

                                            tw.onclick = function (event) {
                                                wordsClickLayerCluster.clearLayers();
                                                event = event || window.event; //IE8
                                                var target = event.target || event.srcElement;
                                                var keywords = target.innerHTML.toString();
                                                var filterByKeywords = [];



                                                for (var i=0; i<convertedArray.length; i++){
                                                    var keywordfromdatas = convertedArray[i].keywords.toString();
                                                    if (keywords === keywordfromdatas)  {
                                                        filterByKeywords.push(convertedArray[i]);
                                                    }
                                                }


                                                for (var i = filterByKeywords.length - 1; i >= 0; i--) {
                                                var myIcon = L.icon({
                                                    iconUrl: '/images/green1.png',
                                                    iconSize: [10, 10],
                                                    iconAnchor: [10, 10]
                                                });

                                                var markers = L.marker([filterByKeywords[i].loc.coordinates[1], filterByKeywords[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywords[i].text);

                                                wordsClickLayerCluster.addLayer(markers);

                                                
                                                }

                                                leafletObject.addLayer(wordsClickLayerCluster);
                                            
                                            };

                                          
                                           
                                        }

                                        function tableText(i){
                                           var convertedArray = [];
                                            var text = $(clusterList[i][5]);

                                            for(var i = 0; i < text.length; ++i)
                                            {
                                             convertedArray.push(text[i]);
                                            }

                                             var textTable = document.getElementById('text');

                                              if (textTable.children[0].rows.length === 1)
                                              {
                                                  for (var i =  0; i <= 100 - 1; i++)
                                                       {
                                                        textTable.children[0].innerHTML += "<td>"+convertedArray[i]+"</td>";
                                                          
                                                       }
                                              }
                                              else
                                              {
                        
                                                  for (var i =  0; i <= 100 - 1; i++)
                                                       {
                                                        textTable.children[0].rows[i].innerHTML = "<td>"+convertedArray[i]+"</td>" ;
                                                       }
                                              }
                                           
                                        }

                                        var textClickLayer = L.layerGroup();
                                        function textClick(i){

                                           var convertedArray = [];
                                            var text = $(clusterList[i][4]);

                                            for(var i = 0; i < text.length; ++i)
                                            {
                                             convertedArray.push(text[i]);
                                            }

                                            var ta = document.getElementById('text');
                                            textClickLayer.clearLayers();

                                            ta.onclick = function (event) {
                                                textClickLayer.clearLayers();
                                                event = event || window.event; //IE8
                                                var target = event.target || event.srcElement;
                                                var texts = target.innerHTML.toString().substring(0, 15);
                                                var filterByText = [];


                                                console.log(texts);

                                                for (var i=0; i<convertedArray.length; i++){
                                                    var textfromdata = convertedArray[i].text.toString().substring(0, 15);
                                                    if (texts === textfromdata)  {
                                                        filterByText.push(convertedArray[i]);
                                                    }
                                                }


                                                for (var i = filterByText.length - 1; i >= 0; i--) {
                                                var myIcon = L.icon({
                                                    iconUrl: '/images/red3.png',
                                                    iconSize: [12, 12],
                                                    iconAnchor: [12, 12]
                                                });

                                                var markers = L.marker([filterByText[i].loc.coordinates[1], filterByText[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByText[i].text);

                                                textClickLayer.addLayer(markers);
             
                                                }
                                            

                                                leafletObject.addLayer(textClickLayer);
                                            
                                            };
                                        }

                                         function clickChart(i){

                                            var convertedArray = [];
                                            var time = $(clusterList[i][6]);

                                            for(var i = 0; i < time.length; ++i)
                                            {
                                             convertedArray.push(time[i]);
                                            }
                                            var groupTime = convertedArray.join(' ');
                                           
                                            var timeArray = groupTime.split(' ');
                                            var arrayOnlyMonth = [];

                                            for(var i = 2; i < timeArray.length; i += 2) {  // take every second element
                                                arrayOnlyMonth.push(timeArray[i]);
                                            }

                                            var timeFrequency = getTimeFrequency(arrayOnlyMonth);

                                            var chart = 'chart1';
                                            var title = "tweets keywords frequency";

                                            charts(timeFrequency,chart,title);
                                          
                                        }

                                        function clickRadar(i){

                                            var convertedArray = [];
                                            var all = $(clusterList[i][4]);

                                            for(var i = 0; i < all.length; ++i)
                                            {
                                             convertedArray.push(all[i]);
                                            }
                                            
                                             var margin = {top: 50, right: 50, bottom: 50, left: 50},
                                                  width = Math.min(240, window.innerWidth - 10) - margin.left - margin.right,
                                                  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                                                      

                                              var data2 = [];
                                              var dataFinal = [];
                                              var r_grouped = [];
                                              var filterResult = [];

                                               for(var j=0;j<convertedArray.length;j++){
                                                  if (convertedArray[j].weight !== "553mi")
                                                  {
                                                      filterResult.push(convertedArray[j]);
                                                  }
                                                }

                                              filterResult.forEach(function (a, i) {
                                                  if (!this[a.keywords]) {
                                                      this[a.keywords] = { keywords: a.keywords, weight: []};

                                                      r_grouped.push(this[a.keywords]);
                                                  }
                                                  this[a.keywords].weight.push(a.weight);
                                              }, Object.create(null));




                                              r_grouped.forEach( function (arrayItem)
                                              {
                                                  var obj = {};
                                                  var x = arrayItem.weight;
                                                  var sum = 0;
                                                  var average = 0;
                                                  var count = 0;

                                                  for (i=0;i<x.length;i++)
                                                  {
                                                  sum += x[i];
                                                  count++;
                                                  }

                                                  average = Math.round(sum/count * 100) / 100;

                                                  obj['keywords'] = arrayItem.keywords;
                                                  obj['value'] = average; 
                                                  data2.push(obj);
                                              });

                                              data2.sort(function(a, b) {
                                                  return b.value - a.value;
                                              });

                                              for (i = 0; i < 10; i++)
                                              {
                                                  dataFinal.push(data2[i]);
                                              }

                                              var color = d3_3_5_5.scale.ordinal()
                                                  .range(["#EDC951","#CC333F","#00A0B0"]);
                                                  
                                              var radarChartOptions = {
                                                w: width,
                                                h: height,
                                                margin: margin,
                                                maxValue: 0.5,
                                                levels: 5,
                                                roundStrokes: true,
                                                color: color
                                              };
                                              //Call function to draw the Radar chart
                                              RadarChart(".radarChart", [dataFinal], radarChartOptions);
                                          
                                        }



                              var table = document.getElementById("myTable");
                            
                              var row = table.insertRow(0);
                              var cell1 = row.insertCell(0);
                              var cell2 = row.insertCell(1);
                              var cell3 = row.insertCell(2);
                              var cell4 = row.insertCell(3);
                              var cell5 = row.insertCell(4);
                              cell1.width = 100;
                              cell1.innerHTML = "<span style='color:red; display:block; cursor:pointer; width:100%;' id ='clulight"+clusteri+"'> Area"+clusteri+"</span>";
                              cell2.innerHTML = "<span style='color:white;'>" +result.data.length + "tweets</span>";
                              // cell2.appendChild(hideShape);
                              cell3.innerHTML = "<button id ='cluhide"+clusteri+"'> hide </button>";
                              cell4.innerHTML = "<button id ='clushow"+clusteri+"'> show </button>";
                              cell5.innerHTML = "<button id ='cluremove"+clusteri+"'> remove </button>";

                              $(".controlPanel").find("button").click(function(event) {

                                var idName = this.id;

                                  if (idName.substring(0, 4) === "cluh")
                                  {
                                    hideList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "clus")
                                  {
                                    console.log("we are in cluster");
                                    showList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "clur")
                                  {
                                    $(this).closest('tr').remove();
                                    hideList(idName.slice(-1));
                                  }
                                  event.stopImmediatePropagation();
                              });

                              $(".controlPanel").find("span").on('click',function(event){
                                var idName = this.id;

                                 if (idName.substring(0, 4) === "clul")
                                  {
                                    highLight(idName.slice(-1));

                                      if(this.style.background == "") {
                                            $(this).css('background', '#e8875a');
                                            $(this).closest('tr').css('background', '#e8875a');
                                            
                                        }
                                        else {
                                            $(this).css('background', '');
                                            $(this).closest('tr').css('background', '');
                                           
                                        }

                                    tableKeywords(idName.slice(-1));
                                    wordsClick(idName.slice(-1));
                                    tableText(idName.slice(-1));
                                    textClick(idName.slice(-1));
                                    clickChart(idName.slice(-1));
                                    clickRadar(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "cluaa")
                                  {

                                  }

                                  event.stopImmediatePropagation();

                              });
                              ++clusteri;

                               ///////////////////////////////////////////////////////////////////////////////////



                          }



                          else if (document.getElementById('checkMarker').checked)
                          {
                            leafletObject.addLayer(groupMarker);

                             ///////////////////////////////////////marker Control panel////////////////////////////////////////////

                            layerList.push([groupMarker._layers,leafletEvent.layer._path,leafletEvent.layer,keywordsJudge,filterBytimeResult,text,timesArray]);

                             function hideList(i){

                                            $(layerList[i][1]).hide();

                                            for (var key in layerList[i][0]) {
                                              $(layerList[i][0][key]._icon).hide();
                                            }
                                        }

                             function showList(i){
                                            $(layerList[i][1]).show();
                                           
                                            for (var key in layerList[i][0]) {
                                              $(layerList[i][0][key]._icon).show();
                                            }
                                        }

                               function highLight(i){

                               
                                           if ($(layerList[i][1])[0].getAttribute('fill') == "yellow")
                                           {
                                            $(layerList[i][2])[0].setStyle({fillColor: '#662d91'});
                                           }
                                           else
                                           {
                                            $(layerList[i][2])[0].setStyle({fillColor: 'yellow'});
                                           }
                                           
                                        }

                                function tableKeywords(i){

                                            var convertedArray = [];
                                            var keywords = $(layerList[i][3]);

                                            for(var i = 0; i < keywords.length; ++i)
                                            {
                                             convertedArray.push(keywords[i]);
                                            }
                                            var groupWords = convertedArray.join(' ');

                                            /////////////////////////////////////generate keywords and frequency////////////////////////////////

                                             var topWords = getTopNWords(groupWords, 20);
                                              var topFrenquency = getTopNFrenquency (groupWords, 20)

                                              var keywordsTable = document.getElementById('keywords');

                                              if (keywordsTable.children[0].rows.length === 1)
                                              {
                                                  for (var i =  0; i <= topWords.length - 1; i++)
                                                       {
                                                        keywordsTable.children[0].innerHTML += "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                                          
                                                       }
                                              }
                                              else
                                              {
                        
                                                  for (var i =  0; i <= topWords.length - 1; i++)
                                                       {
                                                        keywordsTable.children[0].rows[i].innerHTML = "<td>"+topWords[i]+"</td>" + "<td>"+topFrenquency[i]+"</td>";
                                                       }
                                              }

                                              /////////////////////////////////////////////////////////////////////////////////////////////////////

                                           
                                        }

                                        var wordsClickLayer = L.layerGroup();
                                        function wordsClick(i){
                                          wordsClickLayer.clearLayers();

                                          var convertedArray = [];
                                          var keyyy = $(layerList[i][4]);

                                          for(var i = 0; i < keyyy.length; ++i)
                                            {
                                             convertedArray.push(keyyy[i]);
                                            }


                                            var tw = document.getElementById('keywords');

                                            tw.onclick = function (event) {
                                                wordsClickLayer.clearLayers();
                                                event = event || window.event; //IE8
                                                var target = event.target || event.srcElement;
                                                var keywords = target.innerHTML.toString();
                                                var filterByKeywords = [];



                                                for (var i=0; i<convertedArray.length; i++){
                                                    var keywordfromdatas = convertedArray[i].keywords.toString();
                                                    if (keywords === keywordfromdatas)  {
                                                        filterByKeywords.push(convertedArray[i]);
                                                    }
                                                }

                                                for (var i = filterByKeywords.length - 1; i >= 0; i--) {
                                                var myIcon = L.icon({
                                                    iconUrl: '/images/green1.png',
                                                    iconSize: [12, 12],
                                                    iconAnchor: [12, 12]
                                                });

                                                var markers = L.marker([filterByKeywords[i].loc.coordinates[1], filterByKeywords[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByKeywords[i].text);

                                                wordsClickLayer.addLayer(markers);

                                                
                                                }

                                                leafletObject.addLayer(wordsClickLayer);
                                            
                                            };

                                          
                                           
                                        }

                                        function tableText(i){
                                           var convertedArray = [];
                                            var text = $(layerList[i][5]);

                                            for(var i = 0; i < text.length; ++i)
                                            {
                                             convertedArray.push(text[i]);
                                            }

                                             var textTable = document.getElementById('text');

                                              if (textTable.children[0].rows.length === 1)
                                              {
                                                  for (var i =  0; i <= 100 - 1; i++)
                                                       {
                                                        textTable.children[0].innerHTML += "<td>"+convertedArray[i]+"</td>";
                                                          
                                                       }
                                              }
                                              else
                                              {
                        
                                                  for (var i =  0; i <= 100 - 1; i++)
                                                       {
                                                        textTable.children[0].rows[i].innerHTML = "<td>"+convertedArray[i]+"</td>" ;
                                                       }
                                              }
                                            
                                           
                                        }


                                        var textClickLayer = L.layerGroup();
                                        function textClick(i){

                                           var convertedArray = [];
                                            var text = $(layerList[i][4]);

                                            for(var i = 0; i < text.length; ++i)
                                            {
                                             convertedArray.push(text[i]);
                                            }

                                            var ta = document.getElementById('text');
                                            textClickLayer.clearLayers();

                                            ta.onclick = function (event) {
                                                textClickLayer.clearLayers();
                                                event = event || window.event; //IE8
                                                var target = event.target || event.srcElement;
                                                var texts = target.innerHTML.toString().substring(0, 15);
                                                var filterByText = [];


                                                console.log(texts);

                                                for (var i=0; i<convertedArray.length; i++){
                                                    var textfromdata = convertedArray[i].text.toString().substring(0, 15);
                                                    if (texts === textfromdata)  {
                                                        filterByText.push(convertedArray[i]);
                                                    }
                                                }


                                                for (var i = filterByText.length - 1; i >= 0; i--) {
                                                var myIcon = L.icon({
                                                    iconUrl: '/images/red3.png',
                                                    iconSize: [15, 15],
                                                    iconAnchor: [15, 15]
                                                });

                                                var markers = L.marker([filterByText[i].loc.coordinates[1], filterByText[i].loc.coordinates[0]], {icon: myIcon}).bindPopup(filterByText[i].text);

                                                textClickLayer.addLayer(markers);
             
                                                }
                                            

                                                leafletObject.addLayer(textClickLayer);
                                            
                                            };
                                        }

                                         function clickChart(i){

                                            var convertedArray = [];
                                            var time = $(layerList[i][6]);

                                            for(var i = 0; i < time.length; ++i)
                                            {
                                             convertedArray.push(time[i]);
                                            }
                                            var groupTime = convertedArray.join(' ');
                                           
                                            var timeArray = groupTime.split(' ');
                                            var arrayOnlyMonth = [];

                                            for(var i = 2; i < timeArray.length; i += 2) {  // take every second element
                                                arrayOnlyMonth.push(timeArray[i]);
                                            }

                                            var timeFrequency = getTimeFrequency(arrayOnlyMonth);
                                            var chart = 'chart1';
                                            var title = "tweets keywords frequency";

                                            charts(timeFrequency,chart,title);
                                          
                                        }

                                        function clickRadar(i){

                                            var convertedArray = [];
                                            var all = $(layerList[i][4]);

                                            for(var i = 0; i < all.length; ++i)
                                            {
                                             convertedArray.push(all[i]);
                                            }
                                            
                                             var margin = {top: 50, right: 50, bottom: 50, left: 50},
                                                  width = Math.min(240, window.innerWidth - 10) - margin.left - margin.right,
                                                  height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
                                                      
                                              var data2 = [];
                                              var dataFinal = [];
                                              var r_grouped = [];
                                              var filterResult = [];

                                               for(var j=0;j<convertedArray.length;j++){
                                                  if (convertedArray[j].weight !== "553mi")
                                                  {
                                                      filterResult.push(convertedArray[j]);
                                                  }
                                                }

                                              filterResult.forEach(function (a, i) {
                                                  if (!this[a.keywords]) {
                                                      this[a.keywords] = { keywords: a.keywords, weight: []};

                                                      r_grouped.push(this[a.keywords]);
                                                  }
                                                  this[a.keywords].weight.push(a.weight);
                                              }, Object.create(null));




                                              r_grouped.forEach( function (arrayItem)
                                              {
                                                  var obj = {};
                                                  var x = arrayItem.weight;
                                                  var sum = 0;
                                                  var average = 0;
                                                  var count = 0;

                                                  for (i=0;i<x.length;i++)
                                                  {
                                                  sum += x[i];
                                                  count++;
                                                  }

                                                  average = Math.round(sum/count * 100) / 100;

                                                  obj['keywords'] = arrayItem.keywords;
                                                  obj['value'] = average; 
                                                  data2.push(obj);
                                              });

                                              data2.sort(function(a, b) {
                                                  return b.value - a.value;
                                              });

                                              for (i = 0; i < 10; i++)
                                              {
                                                  dataFinal.push(data2[i]);
                                              }

                                              var color = d3_3_5_5.scale.ordinal()
                                                  .range(["#EDC951","#CC333F","#00A0B0"]);
                                                  
                                              var radarChartOptions = {
                                                w: width,
                                                h: height,
                                                margin: margin,
                                                maxValue: 0.5,
                                                levels: 5,
                                                roundStrokes: true,
                                                color: color
                                              };
                                              //Call function to draw the Radar chart
                                              RadarChart(".radarChart", [dataFinal], radarChartOptions);
                                          
                                        }

                
                              var table = document.getElementById("myTable");
                            
                              var row = table.insertRow(0);
                              var cell1 = row.insertCell(0);
                              var cell2 = row.insertCell(1);
                              var cell3 = row.insertCell(2);
                              var cell4 = row.insertCell(3);
                              var cell5 = row.insertCell(4);
                              cell1.width = 100;

                              cell1.innerHTML = "<span style='color:yellow; display:block; cursor:pointer; width:100%;' id ='highlight"+markeri+"'> Area"+markeri+"</span>";
                              cell2.innerHTML = "<span style='color:white;'>" +result.data.length + "tweets</span>";
                              cell3.innerHTML = "<button id ='hidelist"+markeri+"'> hide </button>";
                              cell4.innerHTML = "<button id ='showlist"+markeri+"'> show </button>";
                              cell5.innerHTML = "<button id ='removlist"+markeri+"'> remove </button>";

                              $(".controlPanel").find("button").click(function(event) {
                                var idName = this.id;
                                  if (idName.substring(0, 4) === "hide")
                                  {
                                    hideList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "show")
                                  {
                                    showList(idName.slice(-1));
                                  }
                                  else if (idName.substring(0, 4) === "remo")
                                  {
                                    $(this).closest('tr').remove()
                                    hideList(idName.slice(-1));
                                  }
                                  event.stopImmediatePropagation();
                              });

                              $(".controlPanel").find("span").on('click',function(event) {
                                var idName = this.id;
                                 if (idName.substring(0, 4) === "high")
                                  {
                                    highLight(idName.slice(-1));

                                      if(this.style.background == "") {
                                            $(this).css('background', '#e8bd5a');
                                            $(this).closest('tr').css('background', '#e8bd5a');
                                            
                                        }
                                        else {
                                            $(this).css('background', '');
                                            $(this).closest('tr').css('background', '');
                                           
                                        }

                                    tableKeywords(idName.slice(-1));
                                    wordsClick(idName.slice(-1));
                                    tableText(idName.slice(-1));
                                    textClick(idName.slice(-1));
                                    clickChart(idName.slice(-1));
                                    clickRadar(idName.slice(-1));

                                  }
                                  else if (idName.substring(0, 4) === "showaaa")
                                  {
                                    
                                  }
                                  event.stopImmediatePropagation();


                              });

                              ++markeri;


                               ///////////////////////////////////////////////////////////////////////////////////


                          }

                          else if (document.getElementById('checkHeatmap').checked)
                          {

                            var heatList = [];

                            for (var i = filterBytimeResult.length - 1; i >= 0; i--) {

                            heatList.push([filterBytimeResult[i].loc.coordinates[1], filterBytimeResult[i].loc.coordinates[0]]);
                    

                            }

                            // //console.log(heatList);
                            var heat = L.heatLayer(heatList,{
                                radius: 20,
                                blur: 15, 
                                maxZoom: 17,
                            }).addTo(leafletObject);
                            
                          }


                            ////////////////////////////////////////////One Click Remove///////////////////////////////////////

                                     function removeAll(){
                                           for (var i=0; i <clusterList.length; i++)
                                           {
                                              $(clusterList[i][1]).hide();

                                            for (var key in clusterList[i][0]) {
                                              $(clusterList[i][0][key]._icon).hide();
                                            }
                                           }

                                           for (var i=0; i <clickClusterList.length; i++)
                                           {

                                            for (var key in clickClusterList[i]) {
                                              $(clickClusterList[i][key]._icon).hide();
                                            }
                                           }

                                           for (var i=0; i <layerList.length; i++)
                                           {
                                              $(layerList[i][1]).hide();

                                            for (var key in layerList[i][0]) {
                                              //console.log(layerList[0][key]);
                                              $(layerList[i][0][key]._icon).hide();
                                            }
                                           }

                                           $("#myTable").empty();
                                           $("#myClusterTable").empty();
                                           //$("#keywords tbody tr").empty();
                                           

                                            if (document.getElementById('checkCluster').checked)
                                            {
                                              wordsClickLayerCluster.clearLayers();
                                              groupMarkerbyTime.clearLayers();
                                              groupMarkerByWord.clearLayers();
                                              groupMarkerByText.clearLayers();
                                              groupMarkerByTweets.clearLayers();
                                              groupMarkerbyUsername.clearLayers();
                                              document.getElementById('chart1').innerHTML = "";
                                              document.getElementById('radar1').innerHTML = "";
                                              document.getElementById('chart2').innerHTML = "";
                                              document.getElementById('radar2').innerHTML = "";

                                              // $("#clusterWords tbody tr").empty();
                                              $("#userName tbody tr").empty();
                                              $("#userNameS tbody tr").empty();
                                              $("#clusterWords tbody tr").empty();
                                              $("#keywords tbody tr").empty()
                                              $("#text tbody tr").empty()

                                            }
                                            else if (document.getElementById('checkMarker').checked)
                                            {
                                              groupMarkerByText.clearLayers();
                                              groupMarkerByTweets.clearLayers();
                                              wordsClickLayer.clearLayers();
                                              textClickLayer.clearLayers();
                                              $("#keywords tbody tr").empty();
                                              $("#userName tbody tr").empty();
                                              $("#userNameS tbody tr").empty();
                                              $("#text tbody tr").empty()
                                              document.getElementById('chart1').innerHTML = "";
                                              document.getElementById('radar1').innerHTML = "";
                                              document.getElementById('chart2').innerHTML = "";
                                              document.getElementById('radar2').innerHTML = "";

                                            }

                                            else if (document.getElementById('checkHeatmap').checked)
                                            {
                                              leafletObject.removeLayer(heat);
                                              $(leafletEvent.layer._path).hide();
                                              $("#keywords tbody tr").empty();
                                              $("#userName tbody tr").empty();
                                              $("#userNameS tbody tr").empty();
                                              $("#text tbody tr").empty()
                                              document.getElementById('chart1').innerHTML = "";
                                              document.getElementById('radar1').innerHTML = "";
                                              document.getElementById('chart2').innerHTML = "";
                                              document.getElementById('radar2').innerHTML = "";

                                            }
                                        


                                        }

                             document.getElementById('removeCluster').onclick=function(){removeAll()};


                          ///////////////////////////////////////////////////////////////////////////////////////////


                    }


                            
            }

            },
            edited: function(arg) {},
            deleted: function(arg) {
                var layers;
                layers = arg.layers;
                drawnItems.removeLayer(layer);
            },
            drawstart: function(arg) {},
            drawstop: function(arg) {

            },
            editstart: function(arg) {},
            editstop: function(arg) {},
            deletestart: function(arg) {},
            deletestop: function(arg) {}
        };

        var drawEvents = leafletDrawEvents.getAvailableEvents();
        drawEvents.forEach(function(eventName){
            $scope.$on('leafletDirectiveDraw.' + eventName, function(e, payload) {
                //{leafletEvent, leafletObject, model, modelName} = payload
                var leafletEvent, leafletObject, model, modelName; //destructuring not supported by chrome yet :(
                leafletEvent = payload.leafletEvent, leafletObject = payload.leafletObject, model = payload.model,
                modelName = payload.modelName;
                handle[eventName.replace('draw:','')](e,leafletEvent, leafletObject, model, modelName);
            });
        });
    };

}());