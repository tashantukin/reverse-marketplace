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


//delete the current custom tables. in case of re installing the plugin, 

  $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_fields_tabs';
  $couponDetails = callAPI("GET", null, $url, false);
   echo json_encode(['result' => $couponDetails]);

  foreach($couponDetails['Records'] as $record) {
    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_fields_tabs/rows/'. $record['Id'];
    echo json_encode(['url' => $url]);
    $result = callAPI("DELETE", null, $url);
  }

    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/onboard_fields_tabs';
    $couponDetails = callAPI("GET", null, $url, false);
   echo json_encode(['result' => $couponDetails]);

    foreach($couponDetails['Records'] as $record) {
        $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/onboard_fields_tabs/rows/'. $record['Id'];
        echo json_encode(['url' => $url]);
        $result = callAPI("DELETE", null, $url);
    }

    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_form';
    $couponDetails = callAPI("GET", null, $url, false);
   echo json_encode(['result' => $couponDetails]);

    foreach($couponDetails['Records'] as $record) {
        $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/job_form/rows/'. $record['Id'];
        echo json_encode(['url' => $url]);
        $result = callAPI("DELETE", null, $url);
    }

    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form';
    $couponDetails = callAPI("GET", null, $url, false);
    echo json_encode(['result' => $couponDetails]);

    foreach($couponDetails['Records'] as $record) {
        $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/freelancer_form/rows/'. $record['Id'];
        echo json_encode(['url' => $url]);
        $result = callAPI("DELETE", null, $url);
    }


    //charges configuration
    $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/charges_configuration';
    $couponDetails = callAPI("GET", null, $url, false);
    echo json_encode(['result' => $couponDetails]);

    foreach($couponDetails['Records'] as $record) {
        $url = $baseUrl . '/api/v2/plugins/'. getPackageID() .'/custom-tables/charges_configuration/rows/'. $record['Id'];
        echo json_encode(['url' => $url]);
        $result = callAPI("DELETE", null, $url);
    }


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

    $response = $API->createRowEntry($packageId, 'job_fields_tabs', $tab);
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
                $response = $API->createRowEntry($packageId, 'job_form', $quote);
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
                $response = $API->createRowEntry($packageId, 'job_form', $location);
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
                $response = $API->createRowEntry($packageId, 'job_form', $time_frame);
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
                $response = $API->createRowEntry($packageId, 'job_form', $contact_details);
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

    $response = $API->createRowEntry($packageId, 'onboard_fields_tabs', $tab);
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
                $response = $API->createRowEntry($packageId, 'freelancer_form', $verification_details);
                error_log(json_encode($response));
            }

        }
       
    }

}



//custom charges configuration default

$charge_obj_list = [

    'chargeList' => [

        [
           
            "is_fixed"=> 1,
            "user"=> "seller",
            "charge_name" => "job_bid_seller",
            "status"=> "True",
            "description"=> "charges the seller for a bid job",
            "type"=> "fixed",
            "value"=> "600",
            "title"=> "Bid on Job by Seller"
            
        ],

        [
            "description" => "charges the seller once a buyer completed and paid the job",
            "value" => "20",
            "user" => "seller",
            "type" => "percentage",
            "title" => "Job Paid",
            "status"=> "True",
            "is_fixed" => 0,
            "charge_name"=> "job_paid_seller"
            
        ],


        [
            "value" => "20",
            "user" => "buyer",
            "title"=> "Job Listed",
            "type" => "fixed",
            "charge_name"=> "job_listed_buyer",
            "is_fixed"=> 1,
            "status"=> "True",
            "description"=> "charges the buyer for a lodge job"

        ],


        [
            "type" => "fixed",
            "value" => "29",
            "charge_name"=> "job_bid_buyer",
            "title"=> "View Bid on Job by Seller",
            "status"=> "True",
            "is_fixed"=> 1,
            "description"=> "charges the buyer for a bid job",
            "user"=> "buyer"

        ],


        [
            "description"=> "charges the buyer for a an accepted job",
            "type"=> "fixed",
            "charge_name"=> "job_accepted_buyer",
            "is_fixed"=> 0,
            "value"=> "3",
            "status"=> "True",
            "user"=> "buyer",
            "title"=> "Job accepted by Buyer"
            
        ],


        [

            "user"=> "seller",
            "type"=> "percentage",
            "description"=> "charges the seller once a buyer accepted a job",
            "charge_name"=> "job_accepted_seller",
            "status"=> "True",
            "title"=> "View job accepted by Buyer",
            "value"=> "",
            "is_fixed"=> 0

        ],



        [
            
            "is_fixed"=> 0,
            "type"=> "fixed",
            "value"=> "300",
            "charge_name"=> "job_paid_buyer",
            "description"=> "charges the buyer for a paid job",
            "status"=> "True",
            "user"=> "buyer",
            "title"=> "Job Paid"



        ]
        

    ]



];


foreach($charge_obj_list['chargeList'] as $charge) {
    
$response = $API->createRowEntry($packageId, 'charges_configuration', $charge);
error_log(json_encode($response));

}

//email templates
$email_templates_obj = [
    'templates' => [
        [
            "subject" => "New lodged job",
            "title" => "New Job Lodged",
            "description" => "Sent to freelancers once a new job has been added.",
            "category" => "Orders",
            "contents"=> "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ CompanyName }},</p>\n\n<p>A new job you might be interested in has been added to the marketplace.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;\n<p>&nbsp;</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n"
        
        ],


        [
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ AdminName }},</p>\n\n<p><span style=\"color:#000;\">{{ CompanyName }} </span>&nbsp;has registered to the marketplace.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;\n<p>You may view his/her information.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "description" => "Sent to Admin for every new Freelancer sign up.",
            "title" => "New Freelancer Registration",
            "subject" => "New Freelancer Registration",
            "category" => "Orders"
            
        ],

        [
            
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ SellerName }},</p>\n\n<p>Your job application has been accepted.</p>\n\n<p>Please wait for your marketplace owner to contact you for more details regarding the tasks ahead.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;</div>\n\n<p>Regards,<br />\n{{ MarketName }}</p>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "description" => "Sent to seller once the buyer accepted the quotation.",
            "title" => "Quotation Accepted",
            "category" =>  "Orders",
            "subject" => "Your Quotation has been accepted."

        ],


        [
            "category" => "Orders",
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ SellerName }},</p>\n\n<p>Your job application has been rejected.</p>\n\n<p>If you have further enquiries, please contact us.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;</div>\n\n<p>Regards,<br />\n{{ MarketName }}</p>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "description" => "Sent to seller once the buyer rejected the quotation.",
            "subject" => "Quotation Rejected",
            "title" => "Quotation Rejected"
            
        ],

        [

            "category" => "Buyer / Seller",
            "subject" => "Your Registration has been approved",
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ SellerName }},</p>\n\n<p>Your registration application has been approved.</p>\n\n<p>Please log in to your account to complete the onboarding.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;</div>\n\n<p>Regards,<br />\nMarketplaceName</p>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "title" => "Freelancer / Applicant Registration approved",
            "description" => "Sent to applicants once their application has been approved."

        ],

        [

            "subject" => "Your Quotation has been accepted.",
            "title" => "Quotation Accepted",
            "description" => "Sent to seller once the buyer accepted the quotation.",
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ SellerName }},</p>\n\n<p>Your job application has been accepted.</p>\n\n<p>Please wait for your marketplace owner to contact you for more details regarding the tasks ahead.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;</div>\n\n<p>Regards,<br />\nMarketplaceName</p>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "category" => "Booking"

        ],


        [

            "title" => "Freelancer / Applicant Registration rejected",
            "contents" => "<div style=\"max-width:700px; width:100%; margin:0 auto; border:1px solid #ddd; color:#999; font-size:16px; font-family:sans-serif; line-height:25px;\">\n<div style=\"padding:15px;\">\n<div style=\"text-align:center; margin-bottom:50px;\"><img src=\"{{ Logo }}\" style=\"max-width:200px;\" /></div>\n\n<div>\n<p style=\"color:#000; font-weight:bold; margin-bottom:50px;\">Dear {{ SellerName }},</p>\n\n<p>Your registration application has been rejected.</p>\n\n<p>Please log in to your account to see details.</p>\n</div>\n\n<div style=\"margin-bottom:30px;\">&nbsp;</div>\n\n<p>Regards,<br />\nMarketplaceName</p>\n\n<div style=\"margin-bottom:30px;\">\n<p><a href=\"{{ MarketplaceUrl }}\" style=\"color:#000; font-size:17px; font-weight:bold; text-decoration:none;\">{{ MarketplaceUrl }}</a></p>\n</div>\n</div>\n</div>\n",
            "subject" => "Your Registration has been rejected",
            "category" => "Buyer / Seller",
            "description" => "Sent to applicants once their application has been rejected."
        ]

    ]
];

foreach($email_templates_obj['templates'] as $template) {
    
$response = $API->createRowEntry($packageId, 'Templates', $template);
error_log(json_encode($response));

}

?>