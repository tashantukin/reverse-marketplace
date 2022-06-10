<!-- begin header -->

<head>

    <meta https-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <<link href="css/landing.css" rel="stylesheet" type="text/css">

        <link href="css/style.css" rel="stylesheet" type="text/css">
        </style>
</head>
<!-- end header -->

<div class="page-content">

    <div class="gutter-wrapper">

        <div class="page-topnav"> <a class="btn-back" href="index.php"><i class="icon icon-arrowleft"></i> Back</a>
        </div>

        <div class="panel-box border-none">
            <div class="page-content-top">
                <div>
                    <h4>Email Template</h4>
                    <h5>Customize the email and html for your notifications sent to your users</h5>
                </div>
            </div>
        </div>


        <div class="panel-box panel-style-ab">
            <div class="panel-box-title">
                <h3>Merchant / Consumer</h3>
                <div class="pull-right"><a class="panel-toggle" href="javascript:void(0);"><i
                            class="icon icon-toggle"></i></a></div>
                <div class="clearfix"></div>
            </div>
            <div class="panel-box-content">
                <ul>
                    <li v-for="template in emailTemplates">
                        <h5> {{template['title']}}</h5>
                        <p>{{template['description']}}</p>
                        <a class="action-edit-template" :href="'edit_content.php?pageid=' + template.Id"
                            :id="template.Id">Edit</a>
                    </li>
                </ul>
            </div>
        </div>


    </div>

</div>

<!-- begin footer -->

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/manage.js"></script>



<!-- end footer -->