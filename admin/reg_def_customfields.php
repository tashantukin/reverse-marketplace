<?php
require 'api.php';
include 'callAPI.php';
 $API = new API();
//include 'admin_token.php';
$contentBodyJson = file_get_contents('php://input');
$content = json_decode($contentBodyJson, true);

$packageId = $API->getPackageID();
$baseUrl = $API->getMarketplaceBaseUrl();
$admin_token = $API->AdminToken();

//declare default tabs object
$tab_obj_jobs = [
    'tabList' => [
        [
            "tab_name" => "Get Quote",
            "sort_order"=> 1
        ],

        [
            "sort_order" => 0,
            "tab_name" => "Select Location"
        ],
        [
            "tab_name"=> "Time Frame",
            "sort_order"=> 2
        ],
        [
            "tab_name" => "Contact Details",
            "sort_order"=> 3
        ]
    ]
];

//get quote customfields

foreach($tab_obj_jobs['tabList'] as $tab) {

    $response = $API->createRowEntry($packageId, 'job_fields_test', $tab);
    error_log(json_encode($response));
    if ($response) {
        $tab_id = $response['Id'];
        if ($tab['tab_name'] == "Get Quote") {
        // $quote_id = $response['Id'];
            $quote_cf = [
                'quoteFields' => [
                [
                    "type_of_field" => "file",
                    "placeholder" => "",
                    "sort_order"=> 0,
                    "text"=> null,
                    "classification" => $tab_id,
                    "is_required"=> "False",
                    "name"=> "Job Documents",
                    "values"=> "[]",
                    "tab_id"=> null

                ],

                [
                    
                    "type_of_field" => "radiobutton",
                    "sort_order" => 1,
                    "placeholder" => "",
                    "classification" => $tab_id,
                    "text" => null,
                    "values" => "[\r\n  \"Fixed\",\r\n  \"Hourly\"\r\n]",
                    "is_required"=> "False",
                    "name" => "Payment",
                    "tab_id"=> null

                ],

                [
                    "type_of_field" => "textfield",
                    "sort_order" => 2,
                    "placeholder" => "",
                    "classification" => $tab_id,
                    "text" => null,
                    "is_required" => "True",
                    "values" => "[]",
                    "name" => "Amount",
                    "tab_id" => null

                ],

                [

                    "type_of_field" => "checkbox",
                    "sort_order"=> 3,
                    "classification"=> $tab_id,
                    "text"=> null,
                    "placeholder"=> "",
                    "is_required"=> "True",
                    "name"=> "Job Type",
                    "values"=> "[\r\n  \"Full time\",\r\n  \"Contract\"\r\n]",
                    "tab_id"=> null


                ],

                [
                    "type_of_field" => "checkbox",
                    "placeholder" => "",
                    "sort_order"=> 4,
                    "classification" => $tab_id,
                    "text" => null,
                    "values" => "[\r\n  \"BAS Agent\",\r\n  \"Tax\",\r\n  \"Audit\",\r\n  \"Book-keeping\",\r\n  \"Payroll\",\r\n  \"Finance\"\r\n]",
                    "name"=> "Type of Tasks",
                    "is_required"=> "True",
                    "tab_id"=> null

                ]

                ]

            ];
            foreach($quote_cf['quoteFields'] as $quote) {
                $response = $API->createRowEntry($packageId, 'job_form_test', $quote);
                error_log(json_encode($response));
            }
            
        }
        if ($tab['tab_name'] == "Select Location"){
            $location_cf = [
                'locationFields' => [
                    [
                        "type_of_field" => "location",
                        "sort_order"=> 0,
                        "classification"=> $tab_id,
                        "text" => null,
                        "placeholder"=> "",
                        "is_required"=> "False",
                        "values"=> "[]",
                        "name"=> "location",
                        "tab_id"=> null
                    ],
                ]
            ];
            foreach($location_cf['locationFields'] as $location) {
                $response = $API->createRowEntry($packageId, 'job_form_test', $location);
                error_log(json_encode($response));
            }
        }
        if ($tab['tab_name'] == "Time Frame") {
            $time_frame_cf = [
                'timeFrameFields' => [
                    [
                    "type_of_field" => "radiobutton",
                        "sort_order" => 0,
                        "placeholder"=> "",
                        "classification"=> $tab_id,
                        "text"=> null,
                        "is_required"=> "False",
                        "values"=> "[\r\n  \"Urgent\",\r\n  \"No Hurry\",\r\n  \"Specify Date\"\r\n]",
                        "name"=> "Job Completion",
                        "tab_id"> null
                    ],

                    [
                    "type_of_field" => "datepicker",
                        "sort_order"=> 1,
                        "placeholder"=> "",
                        "classification"=> $tab_id,
                        "text"=> null,
                        "values"=> "[]",
                        "is_required"=> "False",
                        "name"=> "Completion Date",
                        "tab_id"=> null     
                    ],

                    [
                        "type_of_field"=> "datepicker",
                        "sort_order" => 2,
                        "classification" => $tab_id,
                        "placeholder"=> "",
                        "text"=> null,
                        "is_required"=> "True",
                        "name"=> "Job Validity",
                        "values"=> "[]",
                        "tab_id"=> null
                    ],


                    [
                        "type_of_field" => "textarea",
                        "placeholder"=> "Specify reminders to the applicants etc... ",
                        "sort_order"=> 3,
                        "classification"=> $tab_id,
                        "text"=> null,
                        "name"=> "Comments to the applicant",
                        "is_required"=> "False",
                        "values"=> "[]",
                        "tab_id"=> null
                        
                    ],

                    [
                        "type_of_field" => "checkconfirm",
                        "sort_order"=> 4,
                        "classification"=> $tab_id,
                        "placeholder"=> "",
                        "text"=> null,
                        "is_required"=> "True",
                        "name"=> "I acknowledge that the request I am asking is a legally permitted activity.",
                        "values"=> "[]",
                        "tab_id"=> null

                    ]

                ]
            ];
            foreach($time_frame_cf ['timeFrameFields'] as $time_frame) {
                $response = $API->createRowEntry($packageId, 'job_form_test', $time_frame);
                error_log(json_encode($response));
            }
            
        }
        if($tab['tab_name'] == 'Contact Details'){
            $contact_details_cf = [
                'contactDetailsFields' => [

                    [
                        "type_of_field" => "textfield",
                        "sort_order" => 0,
                        "placeholder" => "",
                        "text"=> "hello",
                        "classification" => $tab_id,
                        "name"=> "Name",
                        "values"=> "[]",
                        "is_required"=> "False",
                        "tab_id" => null 
                    ],

                    [
                        "type_of_field" => "textfield",
                        "sort_order"=> 1,
                        "text"=> null,
                        "classification"=> $tab_id,
                        "placeholder"=> "",
                        "values"=> "[]",
                        "name"=> "Email",
                        "is_required"=> "False",
                        "tab_id" => null

                    ],


                    [
                        "type_of_field" => "textfield",
                        "sort_order"=> 2,
                        "classification"=> $tab_id,
                        "text"=> null,
                        "placeholder"=> "",
                        "name"=> "Contact Number",
                        "is_required"=> "False",
                        "values"=> "[]",
                        "tab_id"=> null
                        
                    ]



                ]
                
            ];

            foreach($contact_details_cf['contactDetailsFields'] as $contact_details) {
                $response = $API->createRowEntry($packageId, 'job_form_test', $contact_details);
                error_log(json_encode($response));
            }
            

        }
        
    }

}

//freelancer tabs

$tab_obj_onboarding = [
    'tabList' => [
        [
            "tab_name" => "Verification Details",
            "sort_order"=> 0
        ]
    ]
];

foreach($tab_obj_onboarding['tabList'] as $tab) {

    $response = $API->createRowEntry($packageId, 'onboard_fields_test', $tab);
    error_log(json_encode($response));
    if ($response) {
        $tab_id = $response['Id'];
        if ($tab['tab_name'] == "Verification Details") {
            $verification_details_cf = [
                    'verificationDetailsFields' => [

                    [
                        "text" => "Company Name",
                        "classification" => $tab_id,
                        "values"=> "[]",
                        "placeholder" => "",
                        "name"=> "Company Name",
                        "is_required"=> "True",
                        "type_of_field"=> "textfield",
                        "sort_order"=> null,
                        "tab_id"=> null
                        
                    ],
                        

                    [
                        "name"=> "Address Details",
                        "sort_order"=> 0,
                        "type_of_field"=> "address-fields",
                        "values"=> "[]",
                        "text"=> "",
                        "placeholder"=> "",
                        "classification"=> $tab_id,
                        "is_required"=> "True",
                        "tab_id"=> null  

                    ],

                    [
                        "text" =>  "Telephone ( We shall be calling this number as we verify you.)",
                        "type_of_field"=> "textfield",
                        "values"=> "[]",
                        "classification"=>  $tab_id,
                        "name"=> "Contact Number",
                        "is_required"=> "True",
                        "placeholder"=> "",
                        "sort_order"=> 1,
                        "tab_id"=> null

                    ],


                    [
                        "type_of_field" => "location",
                        "values"=> "[]",
                        "placeholder"=> "",
                        "classification"=> $tab_id,
                        "name"=> "Servicing Area",
                        "is_required"=> "True",
                        "sort_order"=> 2,
                        "text"=> "Servicing Area",
                        "tab_id"=> null
                    ],

                    [

                        "values" => "[]",
                        "placeholder"=> "",
                        "is_required"=> "True",
                        "type_of_field" => "file",
                        "text"=> "Select verification method of upload",
                        "classification"=> $tab_id,
                        "sort_order"=> 3,
                        "name"=> "Verification method",
                        "tab_id"=> null

                    ]

                ]
            ];

            foreach($verification_details_cf['verificationDetailsFields'] as $verification_details) {
                $response = $API->createRowEntry($packageId, 'freelancer_form_test', $verification_details);
                error_log(json_encode($response));
            }

        }
       
    }

}


?>