
// Create Tabulator on DOM element with id "table"
var aedcData = new Tabulator("#gridPrint", {
   
    //ajaxURL: `${myIp}/claimsupdate/${util.getCookie('f_region')}/${util.getCookie('grp_id')}/${util.getCookie('f_email')}`, // URL of your API endpoint
    //ajaxContentType:"json",
   
    height: "360px", // height of table
    
    layout:'fitColumns',

    htmlOutputConfig:{
        formatCells: true
    },

    placeholder: 'Please Select Location',
     //layout:"fitDataFill",
    // responsiveLayout:"collapse",
    //rowHeader:{
    //    formatter:"responsiveCollapse",
   // },

    rowFormatter:function(row){
        if(row.getData().status !== "Available"){
            row.getElement().style.backgroundColor = "#f0b1ad"; //mark rows with age greater than or equal to 18 as successful;
        }
    },

    columns: [ // Define Table Columns
        
        {
            title:"Blk/Lot",
            field:'blk',
            formatter:"html", 
            headerSort:false,
            width:95,
            headerHozAlign:"center", 
            resizable:false,
            formatter:(cell)=>{
                return `Blk ${cell.getData().blk}, Lot ${cell.getData().lot}`
            }
        },
        {
            title:"Area",
            field:'lot_area',
            formatter:"html", 
            headerSort:false,
            width:55,
            headerHozAlign:"center", 
            resizable:false
        },
        {
            title:"Type",
            field:'unit_type',
            formatter:"html", 
            headerSort:false,
            width:55,
            headerHozAlign:"center", 
            resizable:false
        },
        {
            title:"Status",
            field:'status',
            formatter:"html", 
            headerSort:false,
            width:80,
            headerHozAlign:"center", 
            resizable:false,
            formatter:(cell)=>{
                if(cell.getData().agent!=="" || cell.getData().agent !== null){
                    return cell.getData().status + `<br><span style="font-size:8px">** ${cell.getData().agent}</span>`
                }else{
                    return cell.getData().status 
                
                }
                
            }
        },
        {
            title:'Customer',
            field:'customer',
            width:120,
            headerHozAlign:"center", 
            resizable:true
        },
        {
            title:'Date',
            field: 'update_date',
            width:90,
            headerHozAlign:"center", 
            resizable:true
        },
        
        // {
        //     title:'Action',
        //     //field: "reserved", 
        //     formatter:"html", 
        //     headerSort:false, 
        //     width:127,
        //     headerHozAlign:"center", 
        //     resizable:false,
        //     formatter:(cell)=>{
        //         switch( cell.getData().status){
        //             case "Available":
        //                 xpdfbutton =` <a style="width:120px" href="javascript:sales.newEntry('${cell.getData().id}','','','Reserve')" class='btn btn-primary btn-sm' >&nbsp;Reserve </a>`
        //             break;
        //             case "Reserved":
        //                 xpdfbutton =` <a style="width:120px" href="javascript:sales.newEntry('${cell.getData().id}','${cell.getData().customer}','${cell.getData().cellphone}','Sold');" class='btn btn-primary btn-sm' >&nbsp;Mark Sold </a>`
        //             break;
        //             case "Sold":
        //                 xpdfbutton =  "SOLD!"
        //             break;


        //         }

        //         return xpdfbutton
        //     }    
        // },
        // { title: "Rider", 
        //     field: "rider", 
        //     formatter:"html", 
        //     headerSort:false, 
        //     width:330,
        //     headerHozAlign:"center", 
        //     resizable:false,
        //     formatter:(cell)=>{

        //         if( cell.getData().pdf_batch!==null ){

        //             xpdfbatch =     `ATD # ${cell.getData().pdf_batch}<br>
        //             Downloaded by: ${(cell.getData().downloaded_by==null?'NO ID':cell.getData().downloaded_by)}`
        //             xpdfbutton =` <a href='javascript:void(0)' onclick="asn.printPdf('${cell.getData().pdf_batch}','${cell.getData().download_empid}')" class='btn btn-primary btn-sm'>RE-PRINT ${cell.getData().pdf_batch}</a>
        //             <a href='javascript:void(0)' onclick="asn.resetPdf('${cell.getData().pdf_batch}','${cell.getData().download_empid}')" class='btn btn-danger btn-sm'>RESET ${cell.getData().pdf_batch}</a>
        //             `
                   
        //         }else{
        //             xpdfbatch = "ATD PDF NOT YET PROCESSED"
        //             xpdfbutton =` <a href='javascript:void(0)' id ='btn-${cell.getData().id}' onclick="asn.addtoprint('${cell.getData().id}','${cell.getData().rider}','${cell.getData().emp_id}')" class='btn btn-danger btn-sm'>Remove </a>`
        //         }//eif

        //         return  `
        //             Record ID# ${cell.getData().id}<br>
        //             Record Count: ${cell.getData().id_count}<br>
        //             <b>${cell.getData().rider}</b>&nbsp;<i style='color:green;font-size:2em;' class='ti ti-circle-check ' id='${cell.getData().id}'></i><br>
        //             ${cell.getData().emp_id}<br>
        //             <span style='color:red'>${xpdfbatch}</span><br>
        //             ${xpdfbutton}&nbsp;`

        //     },
        // },  
        // { title: "Batch/Yr.", 
        //     field: "batch_file", 
        //     formatter:"html", 
        //     headerSort:false, 
        //     headerHozAlign:"center",
        //     hozAlign:"center", 
        //     width:120,
        //     resizable:false,
        //     formatter:(cell)=>{
        //         return`
        //             ${cell.getData().batch_file}, ${cell.getData().transaction_year}
        //         `
        //     }
        // },
        //  { title: "Region/Hub", 
        //     field: "region", 
        //     formatter:"html", 
        //     headerSort:false, 
        //     headerHozAlign:"center",
        //     hozAlign:"center", 
        //     width:120,
        //     resizable:false,
        //     formatter:(cell)=>{
        //         return`
        //              (${cell.getData().region || 'NO REGION'}, ${cell.getData().hub})
        //             `
        //     }
        // },
        // { title: "Total", 
        //     field: "total",  
        //     headerSort:false, 
        //     headerHozAlign:"center", 
        //     hozAlign:"right", 
        //     formatter:'money',
        //     formatterParams: {
        //         decimal: ".",
        //         thousand: ",",
        //         symbol: "",
        //         precision:2
        //     },
        //     bottomCalc:"sum" ,
        //     bottomCalcFormatter: "money",
        //     bottomCalcFormatterParams:  {
        //         thousand: ",",
        //         precision:2,
        //         decimal:"."
        //     },
        //     width:120,
        //     resizable:false
        // },  
        /*
        { title: "Delivered", 
            field: "delivered", 
            headerSort:false, 
            headerHozAlign:"center", 
            hozAlign:"center",
            //formatter:'html',
            bottomCalc:'sum',
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams:  {
                thousand: ",",
                precision:0
            },
            //formatter:'html',
            formatter:(cell)=>{
                if(cell.getRow().getData().parcel > 0){
                    if(cell.getRow().getData().parcel > cell.getRow().getData().delivered){
                        console.log('dito')
                        return "<span><i class='ti ti-caret-down-filled'></i>&nbsp;"+ cell.getValue()+"</span>"
                        //return "<span style='color:red'>"+cell.getValue()+"</span>"
                    }else{
                        return cell.getValue()
                    }//eif
                }else{
                    return 0
                }//eif
                
            },

                //formatter sampl
                // formatter: "money",
                // bottomCalc: "sum",
                // bottomCalcParams: {
                // precision: 3
                // },
                // bottomCalcFormatter: "money",
                // bottomCalcFormatterParams:  {
                // decimal: ".",
                // thousand: ",",
                // symbol: "$"
                // },
                // formatterParams: {
                // decimal: ".",
                // thousand: ",",
                // symbol: "$"
                // }

         },
        { title: "Amount", 
            field: "total_amount",
            headerSort:false, 
            headerHozAlign:"center",
            hozAlign:"right",
            formatter:"money", 
            formatterParams:{ thousand:","},
            bottomCalc:'sum',
            //bottomCalcParams:{ precision: 1},
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams:  {
                decimal: ".",
                thousand: ",",
                precision: 2

            // symbol: "$"
            },
            
        },
        { title: "Remitted",
            field: "amount_remitted", 
            headerSort:false, 
            headerHozAlign:"center", 
            hozAlign:"right" ,
            formatter:"money", 
            formatterParams:{ 
                thousand:",", 
                precision:2
            },
            bottomCalc:'sum',
           // bottomCalcParams:{ precision: 1},            
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams:  {
                decimal: ".",
                thousand: ",",
                precision: 2
            // symbol: "$"
            }
        },    
        { title: "Remarks", field: "remarks", formatter:"textarea", headerHozAlign:"center", headerSort:false }
        */
    ],

    locale:"en-us",
    langs:{
        "en-us":{
            "pagination":{
                "page_size":"Page Size", //label for the page size select element
                "first":"<i class='ti ti-player-skip-back-filled'></i>", //text for the first page button
                "first_title":"First Page", //tooltip text for the first page button
                "last":"<i class='ti ti-player-skip-forward-filled'></i>",
                "last_title":"Last Page",
                "prev":"Prev",
                "prev_title":"Prev Page",
                "next":"Next",
                "next_title":"Next Page",
            },
        }
    },
    
    pagination:true, //enable pagination
    paginationMode:"local", //enable remote pagination
    paginationSize: 10, //optional parameter to request a certain number of rows per page
    // paginationCounter:function(pageSize, currentRow, currentPage, totalRows, totalPages){
    //     return `<i class='ti ti-database-search'></i>&nbsp;Showing ${pageSize}  rows of ${totalRows} total`;
    // }
});


