const mainContainer = document.getElementById('main');
const sidebar = document.getElementById('sidebar');

let sidebarOpen = false;

const  admin = {

    toggleSidebar : () => {
        if (sidebarOpen) {
            // Collapse sidebar
            sidebar.style.left = '-250px';
            mainContainer.classList.remove('sidebar-open');
            sidebarOpen = false;
        } else {
            // Open sidebar
            sidebar.style.left = '0';
            mainContainer.classList.add('sidebar-open');
            sidebarOpen = true;
        }
    },

    //INCLUDE LISTENER
    listeners:()=>{
        document.getElementById('menuBtn').onclick = admin.toggleSidebar;

        document.getElementById('sidebar').onclick = admin.toggleSidebar;

        // Add event listeners to links
        document.querySelectorAll('.sidebar-link').forEach(link => {
            link.onclick = () => {
            // Collapse sidebar when link clicked
            admin.toggleSidebar();

            // Optionally, you can add actions for navigation here
            };
        });
    },

    siteSelect:(nval)=>{
        if(nval!==""){
            document.getElementById('search-btn').disabled =  false            
        }else{
            document.getElementById('search-btn').disabled =  true
        }
    },

    //=====aedc get housing details=====//
    getSite:async(nSite)=>{

        admin.myToast('Getting Site',2000)

        const response = await fetch(`${myIp}/aedc/getsite/${nSite}`)
        const data = await response.json()

        console.log('data ', data)

        aedcData.setData( data ) //===FILL  GRID DATA

        document.getElementById('h6-txt').innerHTML=`${data[1].project_site}`

        console.log(`get site ${nSite}`)

        //session storage
        sessionStorage.setItem('project_site',`${nSite}`)
    },

    scrollToTop:()=> {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Optional: Adds a smooth scrolling animation
        });
    },

    //====GLOBAL VARS====//
    configObj:null,
    projectModal:null,

    projectlistModal : null,
    dataEntryModal: null,
    
    socket:null,
    nuProjData: [],  //===global array to hold new  site info

    waitingIndicator : document.getElementById('waiting-indicator'),

    myToast:(msg, nTime)=>{
        
        document.getElementById('txtmsg').innerHTML = msg
        
        admin.waitingIndicator.style.display = 'block';
        setTimeout(()=> { 
            admin.waitingIndicator.style.display ='none' 
        }, nTime  )
    },
   
    chart1:null,
    chart2:null,

    //==== get chart from db
    getChart: async()=>{
        
        util.speak('Loading chart...!')
        
        await fetch(`${myIp}/aedc/getperformance`,{
            cache:'reload'
        })
        .then( (res) => res.json() )

        .then( (data)   => {

            console.log('mtd data ',data.agent, data.site )

            admin.loadChart( 'agent',data.agent, admin.chart1, '#agentChart')//load  chart data of agents

            setTimeout(()=> { 
               admin.loadChart( 'loc',data.site, admin.chart2, '#locChart')//load  chart data of agents
 
            }, 100  )
        })	
        .catch((error) => {
            //util.Toast(`Error:, ${error}`,1000)
            console.error('Error:', error)
        })
    },

    //load chart
    loadChart: ( charttype, chartdata, chartObj, renderTo )=>{
        
        //let colors = ['#0277bd', '#00838f', '#00695c', '#2e7d32','#558b2f','#9e9d24','#ff8f00','#d84315'];
        let colors = [ '#0277bd','#d84315',  '#2e7d32','#ff8f00']
                
        var options = {
            series:[], 
            colors:colors,
            chart: {
                type: 'bar',
                height: 350,
                width: 400,
                redrawOnParentResize: false,
                redrawOnWindowResize: false,
                        
            },
            
            plotOptions: {
                bar: {
                    dataLabels: {
                        position: 'top',
                        //orientation:'vertical'
                    }
                }
            },
            
            dataLabels: {
                enabled: true,
                dropShadow: {
                    enabled: true,
                    left: 1,
                    top: 1,
                    opacity: 0.5
                },
                formatter: function (val) {
                    if (val >= 1000000) {
                        return (val / 1000000).toFixed(1) + 'M';
                    } else if (val >= 1000) {
                        return (val / 1000).toFixed(1) + 'K';
                    }
                    
                    return val;
                },
                offsetY:-20,
                style: {
                    fontSize: "12px",
                    colors: ["#d84315","#00695c"]
                },
            
            },
            
            stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
            },
            xaxis: {
                categories: [],

                title: {
                    text: 'Status',
                    style: {
                        fontSize: '10px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        color: '#6699ff' // set your desired color
                    }
                }
            },
            yaxis: {
                title: {
                    text: '',
                    style: {
                        fontSize: '10px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        color: '#6699ff' // set your desired color
                    }
                }    
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val 
                    }
            }
            }

        } //end options
    
        chartObj = new ApexCharts(document.querySelector( renderTo ), options);
        chartObj.render();

        const series = [
            { name: "Reserved", data: [] },
            { name: "Sold", data: [] }
        ];
        
        chartdata.forEach(item => {
            series[0].data.push(parseInt(item.reserved));
            series[1].data.push(parseInt(item.sold));
        });

        chartObj.updateSeries(series);

        let xcat = []
 
        if(charttype=='agent'){
            
            //PUSH THE SDO'S NAME JOM,SHE,LOUIE
            chartdata.forEach(item => {
                if (!xcat.includes(item.owner_name.trim())) {
                    xcat.push(item.owner_name.trim());
                }//eif
            });
  
        }else{  //if house locations
            //PUSH THE SDO'S NAME JOM,SHE,LOUIE
            chartdata.forEach(item => {
                if (!xcat.includes(item.project_site.trim())) {
                    xcat.push(item.project_site.trim());
                }//eif
            });
        }//eidf
        
        chartObj.updateOptions({ 
            xaxis: { categories: xcat }
        });

    },//====== end loadChart()
    

    //INIT 
    init : () =>{
    
        let db = localStorage  //get localstoreage

        owner =  JSON.parse(db.getItem('profile'))  //get profile

        // util.Toasted(`Welcome ${owner.full_name}`,2000,false) //Welcome Message
        admin.myToast( `Welcome ${owner.full_name}`,2600 )

        document.getElementById('profile_pic').src = `./assets/images/profile/${owner.pic}`

        let authz = []
        authz.push( owner.grp_id )
        authz.push( owner.full_name)
        
        //console.log(authz[1])

        //==HANDSHAKE FIRST WITH SOCKET.IO
        const userName = { token : authz[1] , mode: owner.grp_id}//full name token

        admin.socket = io.connect(`${myIp}`, {
            //withCredentials: true,
            transports: ['websocket', 'polling'], // Same as server
            upgrade: true, // Ensure WebSocket upgrade is attempted
            rememberTransport: false, //Don't keep transport after refresh
            query:`userName=${JSON.stringify(userName)}`
            // extraHeaders: {
            //   "osndp-header": "osndp"
            // }
        });//========================initiate socket handshake ================

        admin.socket.on('connect', () => {
            console.log('Connected to AEDC Socket.IO server using:', admin.socket.io.engine.transport.name); // Check the transport
        });

        admin.socket.on('disconnect', () => {
            console.log('Disconnected from AEDC Socket.IO server');
        });

        admin.socket.on('updatechart', (data) => {
            util.speak('Updating Chart!...')
            admin.getChart()
            
        })
        //==============================================END  SOCKET ==========================//
        
        util.loadFormValidation('#searchForm')
        //util.loadFormValidation('#dataEntryForm')
        
        document.getElementById('search-btn').disabled =  true
        
        admin.scrollToTop()

        admin.getChart() // load chart

    }
}//===end main obj

document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});    

document.addEventListener('DOMContentLoaded', function() {
    
    console.log('=======DOM CONTENT LOADED=====')
    
    admin.init()
    admin.listeners()

    /* TAKE OUT MUNA KEYBOARD DETECT

    ///disable  rightclck
    document.onkeydown = function(e) {
    if(e.keyCode == 123) {  // F12
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 73) {  // Ctrl+Shift+I
        return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {  // Ctrl+Shift+J
        return false;
    }
    if(e.ctrlKey && e.keyCode == 85) { // Ctrl+U
        return false;
    }
    }
    */
})