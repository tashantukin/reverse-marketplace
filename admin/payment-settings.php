<div class="page-content">

    <div class="gutter-wrapper">

        <div class="page-topnav"> <a class="btn-back" href="index.php"><i class="icon icon-arrowleft"></i> Back</a>
        </div>

        <div class="panel-box border-none">
            <div class="page-content-top">
                <div>
                    <h4>Payment Settings</h4>
                    <h5>Setup your payment method and customise your fee</h5>
                </div>
            </div>
        </div>

        <div class="panel--box tabular">


            <div class="panel-box payment-content">
                <div class="page-content-btm">
                    <div class="language-selected-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>PAYMENT METHOD</th>
                                    <th>MANDATORY</th>
                                    <th>STATUS</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id="tbLanguageRow">
                                <tr>
                                    <td>
                                        <div class="payment-stripe"></div>
                                    </td>
                                    <td>
                                        <div class="onoffswitch">
                                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox"
                                                id="myonoffswitch2p" checked="">
                                            <label class="onoffswitch-label" for="myonoffswitch1"> <span
                                                    class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span> </label>
                                        </div>
                                    </td>
                                    <td>
                                        <div class="payment-status-color2"></div>
                                        <div class="payment-status">Active</div>

                                    </td>
                                    <td><a href="stripe.php"><span class="btn-payment-link">Settings</span></a>
                                        <div class="animation-svg"><a href="stripe.php"></a></div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div><b>Cash on delivery*</b></div>
                                    </td>
                                    <td>
                                        <div class="onoffswitch">
                                            <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox"
                                                id="myonoffswitchcod">
                                            <label class="onoffswitch-label" for="myonoffswitchcod"> <span
                                                    class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span> </label>
                                        </div>
                                    </td>
                                    <td>

                                        <?php 


                                                    ?>
                                        <div id="payment-cod-indicator" class="payment-status-color2"></div>
                                        <div class="payment-status-cod">Active</div>
                                    </td>
                                    <td><a href="cod.php"><span class="btn-payment-link">Settings</span></a>
                                    </td>
                                </tr>
                                <!-- End last TR after all custom data-->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <form class="job_customise">
                <div class="panel-box panel-remove-margin">
                    <div class="page-content-top">
                        <h4>Customise your fees</h4>
                        <p>Money to be charged by the Marketplace Operator and paid to the operator.</p>
                    </div>
                    <div class="page-content-btm">
                        <h5 class="frame-title">Buyer Setting</h5>
                        <div class="row">
                            <div class="col-md-6 ff-sm-panel">
                                <div class="form-group" v-for="charge in chargesListBuyer"
                                    :charge-type="charge.is_fixed">
                                    <label :for="charge.Id" class="">{{ charge.title }}</label>
                                    <div v-if="charge.is_fixed==0">
                                        <div class="meta-item-radio radio-style-1">
                                            <div class="fancy-radio">
                                                <input type="radio" :checked="charge.type == 'fixed'" value="fixed"
                                                    class="radio-ccheckbox" :name="charge.Id"
                                                    :id="charge.Id + '_fixed'">
                                                <label :for="charge.Id + '_fixed'">
                                                    <span>Fixed Price</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="meta-item-radio radio-style-1">
                                            <div class="fancy-radio">
                                                <input type="radio" :checked="charge.type == 'percentage'"
                                                    value="percentage" class="radio-ccheckbox" :name="charge.Id"
                                                    :id="charge.Id + '_percent'">
                                                <label :for="charge.Id + '_percent'">
                                                    <span>Percentage</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="charge.is_fixed==0" class="job-fonoffswitch">

                                        <div class="form-input-prefix doller-prefix">
                                            <input type="text" class="required form-control input-style-3"
                                                :id="charge.Id" :value="charge.value">
                                        </div>

                                        <div class="onoffswitch">
                                            <input v-if="charge.status=='False'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'">
                                            <input v-if="charge.status=='True'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'" checked>
                                            <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                <span class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span></label>
                                        </div>
                                    </div>

                                    <div v-if="charge.is_fixed==1" class="job-fonoffswitch">
                                        <div v-if="charge.is_fixed==1" class="form-input-prefix doller-prefix">
                                            <input type="text" class="required form-control input-style-3"
                                                :id="charge.Id" :value="charge.value">
                                        </div>

                                        <div class="onoffswitch">
                                            <input v-if="charge.status=='False'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'">
                                            <input v-if="charge.status=='True'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'" checked>
                                            <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                <span class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span></label>
                                        </div>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>


                </div>

                <div class="panel-box">
                    <div class="page-content-btm">
                        <h5 class="frame-title">Seller Setting</h5>

                        <div class="row">
                            <div class="col-md-6 ff-sm-panel">
                                <div class="form-group" v-for="charge in chargesListSeller"
                                    :charge-type="charge.is_fixed">
                                    <label :for="charge.Id" class="">{{ charge.title }}</label>
                                    <div v-if="charge.is_fixed==0">
                                        <div class="meta-item-radio radio-style-1">
                                            <div class="fancy-radio">
                                                <input type="radio" :checked="charge.type == 'fixed'" value="
                                                                fixed" class="radio-ccheckbox" :name="charge.Id"
                                                    :id="charge.Id + '_fixed'">
                                                <label :for="charge.Id + '_fixed'">
                                                    <span>Fixed Price</span>
                                                </label>
                                            </div>
                                        </div>
                                        <div class="meta-item-radio radio-style-1">
                                            <div class="fancy-radio">
                                                <input type="radio" :checked="charge.type == 'percentage'"
                                                    value="percentage" class="radio-ccheckbox" :name="charge.Id"
                                                    :id="charge.Id + '_percent'">
                                                <label :for="charge.Id + '_percent'">
                                                    <span>Percentage</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="charge.is_fixed==0" class="job-fonoffswitch">

                                        <div class="form-input-prefix doller-prefix">
                                            <input type="text" class="required form-control input-style-3"
                                                :id="charge.Id" :value="charge.value">
                                        </div>

                                        <div class="onoffswitch">
                                            <input v-if="charge.status=='False'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'">
                                            <input v-if="charge.status=='True'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'" checked>

                                            <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                <span class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span></label>
                                        </div>
                                    </div>

                                    <div v-if="charge.is_fixed==1" class="job-fonoffswitch">
                                        <div v-if="charge.is_fixed==1" class="form-input-prefix doller-prefix">
                                            <input type="text" class="required form-control input-style-3"
                                                :id="charge.Id" :value="charge.value">
                                        </div>

                                        <div class="onoffswitch">
                                            <input v-if="charge.status=='False'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'">
                                            <input v-if="charge.status=='True'" type="checkbox" name="onoffswitch"
                                                class="onoffswitch-checkbox" :id="charge.Id + '_toggle'" checked>
                                            <label class="onoffswitch-label" :for="charge.Id + '_toggle'">
                                                <span class="onoffswitch-inner"></span> <span
                                                    class="onoffswitch-switch"></span></label>
                                        </div>


                                    </div>

                                </div>
                            </div>
                            <div class="btn-area">
                                <button onclick="job_customise();" class="btn cmn-btn-blue" id="btn-save-charges"
                                    type="button">Save</button>
                            </div>

                        </div>
                    </div>
            </form>



        </div>


    </div>

</div>

<!-- begin footer -->

<script src="https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.js"></script>
<script type="text/javascript" src="scripts/manage.js"></script>
<script type="text/javascript" src="scripts/scripts3.js"></script>
<script type="text/javascript" src="scripts/payments.js"></script>

<!-- end footer -->