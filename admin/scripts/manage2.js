(function() {
    var scriptSrc = document.currentScript.src;
    var urlss = window.location.href.toLowerCase();
    var packagePath = scriptSrc.replace('/scripts/manage.js', '').trim();
    //var indexPath = scriptSrc.replace('/scripts/package.js', '/index.php').trim();
  //  var pagelist = scriptSrc.replace('/scripts/package.js', '/pages_list.php').trim();
    var token = commonModule.getCookie('webapitoken');
    var re = /([a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12})/i;
    var packageId = re.exec(scriptSrc.toLowerCase())[1];
   // var marketplace = scriptSrc.replace('/admin/plugins/' + packageId + '/scripts/package.js', '/pages/').trim();
    var userId = $('#userGuid').val();
    var data1;
    var timezone_offset_minutes = new Date().getTimezoneOffset();
    timezone_offset_minutes = timezone_offset_minutes == 0 ? 0 : -timezone_offset_minutes;
    var pagedids;

    const baseURL = window.location.hostname;
    const protocol = window.location.protocol;

  

    //run on creation page only
   var manageFields =  new Vue({
        el: "#main",
        data() {
            return {
                allJobs: [],
                allFreelancers: [],
                uploadCustomFields: [],
                emailFields: "",
                chargesListBuyer: [],
                chargesListSeller: [],
                perPage: 1,
                page: 0,
                paginationcountJobs: 0,
                currentPageJobs: 1,
                totalItemsJobs: 0,
                paginationcountAll: 0,

                paginationcountApproval: 0,
                currentPageApproval: 1,
                totalItemsApproval: 0,
             
            }
        },

        filters: {
            capitalize: function(str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            },

        },

        methods: {
            async getAllFreelancers(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details?sort=-CreatedDateTime&pageSize=100`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const users = await response
                    vm.allFreelancers = users.data.Records

                    console.log(vm.allFreelancers);
                    

                    vm.emailFields = vm.allFreelancers[0].custom_fields;
                    console.log( vm.emailFields);
                    var addressfield = JSON.parse(vm.emailFields).filter((field) => field.code === 'Address')
                    console.log( addressfield );

                    
                
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },


            setupServerPage(table, totalRecords, perPage)
            {
                console.log('setupserverpage');
                console.log(totalRecords);
                //var totRecs = NumPages * RecsPerPage,s
                tbdy = document.getElementById(table).tBodies[0],
                l = tbdy.rows.length;
            // document.getElementById("plength1").innerHTML = document.getElementById("plength2").innerHTML = totalRecords +
            //     " record" + ((totRecs === 1) ? "" : "s") + "<br>" + totalRecords + " page" + ((totalRecords === 1) ? "" : "s");
            // els1["pcount"].value = els2["pcount"].value = totalRecords
                let jobData = `<tr v-for="job in allJobs" class="border-hover">
                                            <td data-th="Job ID"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{ job.Id }}</a></td>
                                            <td data-th="Lodged by"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{job.buyer_email}}</a>
                                            </td>
                                            <td data-th="Job Location"><a
                                                    :href="'job-details.php?jobId=' + job.Id">{{job.in_person_work_address}}</a>
                                            </td>

                                            <td data-th="Job Type"
                                                v-if="job.is_job_type_contract=='True' &&  job.is_job_type_fulltime=='True'">
                                                <a href="">Contract,Full Time</a>
                                            </td>
                                            <td data-th="Job Type" v-else-if="job.is_job_type_contract=='True'"><a
                                                    href="">Contract</a></td>
                                            <td data-th="Job Type" v-else-if="job.is_job_type_fulltime=='True'"><a
                                                    href="">Full Time</a></td>
                                            <td data-th="Job Type"
                                                v-else="job.is_job_type_fulltime=='False' && job.is_job_type_contract=='False' ">
                                                <a href="">--</a>
                                            </td>

                                            <td data-th="Payment Type" v-if="job.payment_hourly=='True' && job.payment_fixed=='True" ><a href="freelancer.html">Fixed,Hourly</a></td> -->
                                        <!-- <td data-th="Payment Type" v-if="job.is_payment_fixed=='True'"><a
                                                href="">Fixed</a></td>
                                        <td data-th="Payment Type" v-if="job.is_payment_hourly=='True'"><a
                                                href="">Hourly</a></td>

                                        <td data-th="Job to be completed by" v-if="job.time_frame_date != 'False'">
                                            <a href=""><span class="text-danger">{{ job.completion_date }}</span></a>
                                        </td>
                                        <td data-th="Job to be completed by"
                                            v-if="job.time_frame_urgent =='True' && job.time_frame_date == 'False'">
                                            <a href=""><span class="text-danger">Urgent</span></a>
                                        </td>
                                        <td data-th="Job to be completed by"
                                            v-if="job.time_frame_nohurry =='True' && job.time_frame_date == 'False' ">
                                            <a href=""><span class="text-danger">No hurry</span></a>
                                        </td>

                                        <td data-th="Availability"><a href=""><span
                                                    class="text-danger">{{ job.job_validity}}</span></a></td>
                                        <td data-th="No.of Quote"><a
                                                :href="'quote-details.php?jobId=' + job.Id">{{ job.no_of_quotes}}</a>
                                        </td>
                                        <td data-th="Status"><a href="">{{ job.status}}</a></td>
                                        </tr>`;
            while (l > perPage) tbdy.deleteRow(--l);
            while (l < perPage) tbdy.insertRow(l++).insertCell(0).innerHTML = "Some data...";
            //pageNavigate(1);
            },


            pageNavigate(p, NumPages, link)
            {
                vm = this;
           // els1["p"].className = els2["p"].className = els1["p"].value = els2["p"].value = "";
            if (p < 1) p = 1;
            else if (p > NumPages) p = NumPages;
            //els1["p1"].disabled = els2["p1"].disabled = els1["pprev"].disabled = els2["pprev"].disabled = (p === 1);
            //els1["pnext"].disabled = els2["pnext"].disabled = els1["plast"].disabled = els2["plast"].disabled = (p ===
            ///    NumPages);
           // els1["pcurr"].value = els2["pcurr"].value = p;
            // if the server is handling this, insert NON-logarithmic page links here (can be just first, current, and last page).
           //plinks1 = document.getElementById("plinks1"),
             //       plinks1.innerHTML = plinks2.innerHTML = this.logarithmicPaginationLinks(NumPages, p, link);
              /// console.log(this.logarithmicPaginationLinks(NumPages, p, link))
                $('.paginationjs-next').before(this.logarithmicPaginationLinks(NumPages, p, link))

                vm.fetchDataJobs(p, this.perPage);
            },


            logarithmicPaginationLinks(lastPage, matchPage, linkURL)
            { 
                $('.paging').remove();
                function pageLink(p, page) {
                    return ((p === page) ? `<li class="paging" value=${p}
                                            ><a  href="javascript:void(0);">${p}</a>
                                          </li>` : `<li class="paging" value=${p}
                                            ><a  href="javascript:void(0);">${p}</a>
                                          </li>`);
                }
        
                function pageGap(x) {
                    if (x === 0) return "";
                    if (x === 1) return " ";
                    if (x <= 10) return "<li class='paging'> <a href='javascript:void(0);'>.</a></li>"; 
                    if (x <= 100) return "<li class='paging'> <a href='javascript:void(0);'>..</a></li>";
                    return "<li class='paging'> <a href='javascript:void(0);'>...</a></li>";
                }

                var page = (matchPage ? matchPage : 1),
                    LINKS_PER_STEP = 5,
                    lastp1 = 1,
                    lastp2 = page,
                    p1 = 1,
                    p2 = page,
                    c1 = LINKS_PER_STEP + 1,
                    c2 = LINKS_PER_STEP + 1,
                    s1 = "",
                    s2 = "",
                    step = 1,
                    linkHTML = "";

                while (true) {
                    if (c1 >= c2) {
                        s1 += pageGap(p1 - lastp1) + pageLink(p1, matchPage);
                        lastp1 = p1;
                        p1 += step;
                        c1--;
                    } else {
                        s2 = pageLink(p2, matchPage) + pageGap(lastp2 - p2) + s2;
                        lastp2 = p2;
                        p2 -= step;
                        c2--;
                    }
                    if (c2 === 0) {
                        step *= 10;
                        p1 += step - 1; // Round UP to nearest multiple of step
                        p1 -= (p1 % step);
                        p2 -= (p2 % step); // Round DOWN to nearest multiple of step
                        c1 = LINKS_PER_STEP;
                        c2 = LINKS_PER_STEP;
                    }
                    if (p1 > p2) {
                        linkHTML += s1 + pageGap(lastp2 - lastp1) + s2;
                        if ((lastp2 > page) || (page >= lastPage)) break;
                        lastp1 = page;
                        lastp2 = lastPage;
                        p1 = page + 1;
                        p2 = lastPage;
                        c1 = LINKS_PER_STEP;
                        c2 = LINKS_PER_STEP + 1;
                        s1 = '';
                        s2 = '';
                        step = 1;
                    }
                }
                return linkHTML;
            },


            pageClick(e, el)
            {
               // return false;
               // e.preventDefault();
                vm = this
                
                e = e || window.event;
                var s = e.target || e.srcElement,n, p, el;
                console.log({ s })
                n = el.attr('value');
                console.log({n})
               // pageNavigate(p.substring(n) >>> 0);
                // if (s.tagName === "A") {
                //     n = (p = s.href).lastIndexOf("=") + 1;
                //     console.log(`n ${n}`)
                //      console.log(`s ${s.name}`)
                   vm.pageNavigate(n, vm.paginationcountAll);
                    return false;
                // }
                //else if ((s.tagName !== "INPUT") || (s.type !== "submit")) return;


                // if (!(n = s.name)) {
                //     p = ((el = this.elements["p"]).value >>> 0);
                //     if ((p <= 0) || (p > vm.paginationcountAll)) {
                //         el.className = "err";
                //         return false;
                //     }
                // }
                
                //  if (n === "p1") p = 1;
                // else if (n === "pprev") p = (this.elements["pcurr"].value >>> 0) - 1;
                // else if (n === "pnext") p = (this.elements["pcurr"].value >>> 0) + 1;
                // else if (n === "plast") p = (this.elements["pcount"].value >>> 0);
                // pageNavigate(p);
                // return false;
            },


            async getAllJobs(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime&pageSize=100`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const jobs = await response
                    vm.allJobs = jobs.data.Records
                    vm.totalItemsJobs = jobs.data.TotalRecords
                    vm.paginationcountAll= Math.ceil(jobs.data.TotalRecords / this.perPage)

                     //vm.setupServerPage('job-table', jobs.data.TotalRecords, 20) 

                    console.log(vm.allJobs);
                    
                    this.pageNavigate(1, vm.paginationcountAll, `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime&pageSize=20&pageNumber=`)
                    
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },

            async getAllCustomFields(action) {
                try {
                    vm = this;
                    const response = await axios({
                        method: action,
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_form`,
                        // data: data,
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    const fields = await response
                    vm.allFields = fields.data
                   
                    vm.uploadCustomFields = vm.allFields.Records.filter((field) => field.type_of_field === 'file')
                  
                    console.log( vm.uploadCustomFields );
                  
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },

            async getAllCharges(user) {
                try {
                    vm = this;
                    const response = await axios({
                        method: "GET",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration`,
                    })
                    const charges = await response
                    let allCharges = charges.data
                   
                    user == 'buyer' ?
                    vm.chargesListBuyer = allCharges.Records.filter((field) => field.user ===  user)
                        : vm.chargesListSeller = allCharges.Records.filter((field) => field.user === user)
                    
                    console.log( vm.chargesListBuyer );
                    console.log( vm.chargesListSeller );
                    // return templates

                } catch (error) {
                    console.log("error", error);
                }
            },
             
            async saveCharges(chargeId, type, value, status)
            {
                
                try {
                    vm = this;
                    var data = { value , type, status }
                    const response = await axios({
                        method: "PUT",
                        url: `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/charges_configuration/rows/${chargeId}`,
                        headers: {
                        "Content-Type": "application/json"
                        },
                    
                    data: JSON.stringify(data),
                    })
                    const charges = await response
                    
                    console.log({charges})
                    

                } catch (error) {
                    console.log("error", error);
                }



            },

            searchFields: function (cf, header)
            {
               // console.log({ cf });
                var sample = JSON.parse(cf).filter((field) => field.code == header);
                console.log( {sample})
                return JSON.parse(cf).filter((field) => field.code == header)
               // return field.code == header;
             // })
            },

            updateStatus(action, e)
            {
                
                var user_details = {

                    "Id": e.currentTarget.getAttribute('data-id'),
                    'status' : action
                };

                onboardingModalAccept(action)
            
                console.log({ user_details });
                var settings = {
                    "url": packagePath + "/update_status.php",
                    "method": "POST",
                    "data": JSON.stringify(user_details)
                }
                $.ajax(settings).done(function(response){
                    
                   // e.currentTarget.parentElement().hide();

                    console.log($.parseJSON(response));
                   
               
                });

            
            },

            //pagination

            async fetchDataJobs(value, pageCount)
            {
              //this.currentPage = pageNumber
              // this.isActive = !this.isActive;
              this.perPage = pageCount ? pageCount : this.perPage;
              this.currentPageJobs = value;
              let apiUrl = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/job_list?sort=-CreatedDateTime`;
              let actualUrl = apiUrl + `&pageNumber=${value}&pageSize=${this.perPage}`;
             
              try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: actualUrl,
                    // data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const jobs = await response
                vm.allJobs = jobs.data.Records
                
                console.log( vm.allJobs);
                vm.totalItemsJobs = jobs.data.TotalRecords
                vm.paginationcountJobs = Math.ceil(jobs.data.TotalRecords / jobs.data.PageSize)

                console.log(vm.paginationcountJobs);
                // return templates

            } catch (error) {
                console.log("error", error);
            }
             

            },

            async fetchDataApprovals(value, pageCount)
            {
              //this.currentPage = pageNumber
              // this.isActive = !this.isActive;
              this.perPage = pageCount ? pageCount : this.perPage;
              this.currentPageApproval = value;
              let apiUrl = `${protocol}//${baseURL}/api/v2/plugins/${packageId}/custom-tables/freelancer_details?sort=-CreatedDateTime`;
              let actualUrl = apiUrl + `&pageNumber=${value}&pageSize=${this.perPage}`;
             
              try {
                vm = this;
                const response = await axios({
                    method: "GET",
                    url: actualUrl,
                    // data: data,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                const users = await response
                vm.allFreelancers = users.data.Records
                
                console.log( vm.allJobs);
                vm.totalItemsApproval = users.data.TotalRecords
                vm.paginationcountApproval = Math.ceil(users.data.TotalRecords / users.data.PageSize)

                console.log(vm.paginationcountApproval);
                // return templates

            } catch (error) {
                console.log("error", error);
            }
             

            },

        },

        computed: {
           
          },
        mounted: function ()
         {
      //  
        this.fetchDataJobs().catch(error => {
        console.error(error)
        }),

        this.fetchDataApprovals().catch(error => {
            console.error(error)
            })
      },

 
        beforeMount() {
            this.getAllFreelancers('GET')
            this.getAllCustomFields('GET')
            this.getAllJobs('GET');
            this.getAllCharges('buyer');
            this.getAllCharges('seller');
            //this.setupServerPage
        },


    })

    function savePageContent(el) {
        $('#save').addClass('disabled');

        var cc ='', bcc='';
        //cc 
      if ($('#cc_email').val()) {
          var ccTrim = $('#cc_email').val().trim();
           cc = ccTrim.split();
      }
        
        //bcc
      if ($('#bcc_email').val()) {
          var bccTrim = $('#bcc_email').val().trim();
          bcc = bccTrim.split(); 
            
      }

        data1 = CKEDITOR.instances.editor1.getData();
        console.log(data1);
      

        var data = { 'userId': userId, 'title': $('#title').val(), 'content': data1, 'subject': $('#subject').val(), 'description': $('#description').val(), 'type': $("#email-type option:selected").text(), 'cc' : cc, 'bcc' : bcc};
        var apiUrl = packagePath + '/save_new_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('New email template successfully saved.');
                $('#title').val('');
                $('#save').removeClass('disabled');

                if (el.attr('redirect') == 'admin') {
                    window.location.href = emailTemplatePath;
                } else {
                    window.location.href = indexPath;
                }
                //window.location.href = indexPath;
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function saveModifiedPageContent(el) {
        data1 = CKEDITOR.instances.editor1.getData();
        var cc ='', bcc='';
        //cc 
      if ($('#cc_email').val()) {
          var ccTrim = $('#cc_email').val().trim();
           cc = ccTrim.split();
      }
        
        //bcc
      if ($('#bcc_email').val()) {
          var bccTrim = $('#bcc_email').val().trim();
          bcc = bccTrim.split(); 
            
      }

        var data = { 'pageId': $('#pageid').val(), 'userId': userId, 'title': $('#title').val(), 'content': data1, 'subject': $('#subject').val(), 'description': $('#description').val(), 'template-id': $('#pageid').val(), 'type': $("#email-type option:selected").text(), 'cc' : cc, 'bcc' : bcc };
        var apiUrl = packagePath + '/save_modified_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Page Contents successfully updated.');
                $('#title').val('');
                if (el.attr('redirect') == 'admin') {
                    window.location.href = emailTemplatePath;
                } else {
                    window.location.href = indexPath;
                }
                
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function deletePage() {
        var data = { 'pageId': pagedids, 'userId': userId };
        console.log(pagedids);
        var apiUrl = packagePath + '/delete_content.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Page Content successfully deleted.');
                location.reload();
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function sendMail() {
        var data = { 'template': $('.record_id').val(), 'userId': userId, 'to': $('#to').val(), 'from': $('#from').val(), 'buyerName': $('#buyerName').val(), 'merchantName': $('#merchantName').val(), 'invoice': $('#invoiceID').val() };
        var apiUrl = packagePath + '/send_edm.php';
        $.ajax({
            url: apiUrl,
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function(result) {
                console.log(JSON.stringify(result));
                toastr.success('Sample Email has been sent. Please check your email.');
                location.reload();
            },
            error: function(jqXHR, status, err) {}
        });
    }

    function onboardingModalAccept(action){
       

        if (action == "Approved") {
            $(".btn-accept-reject .btn.blue-btn.active").parents("tr").find(`td[data-th="Approval Status"] a`).remove();
            $(".btn-accept-reject .btn.blue-btn.active").parents("tr").find(`td[data-th="Approval Status"]`).append(`<a href="freelancer-details.html"><span class="status-approve">Approved</span></a>`);
        } else {
            $(".btn-accept-reject .btn.gre-btn.active").parents("tr").find(`td[data-th="Approval Status"] a`).remove();
            $(".btn-accept-reject .btn.gre-btn.active").parents("tr").find(`td[data-th="Approval Status"]`).append(`<a href="freelancer-details.html"><span class="status-rejected">Rejected</span></a>`);
        }
        
    
        $(".btn-accept-reject .btn.blue-btn.active").removeClass("active").parent().addClass("hide");
        $(".btn-accept-reject .btn.gre-btn.active").removeClass("active").parent().addClass("hide");

    }

    

    $(document).ready(function ()
    {
        
       // document.getElementsByClassName("paging").onclick = manageFields.pageClick();

        jQuery('body').on('click', '.paging', function(e)  {
            manageFields.pageClick(e, $(this));
        })

        $('.paging').css('margin', 'auto');

        // var pathname = (window.location.pathname + window.location.search).toLowerCase();

        // const index1 = '/admin/plugins/' + packageId;
        // const index2 = '/admin/plugins/' + packageId + '/';
        // const index3 = '/admin/plugins/' + packageId + '/index.php';
        // if (pathname == index1 || pathname == index2 || pathname == index3) {
        //     window.location = pagelist + '?tz=' + timezone_offset_minutes;
        // }

        //save the page contents
        $('#save').click(function() {

            //add field validations
            savePageContent($(this));
            // }
        });
        //save modified page contents
        $('#edit').click(function() {

            if ($("#title").val() == "" || data1 == "") {
                console.log('true');
                toastr.error('Please fill in empty fields.');

            } else {
                saveModifiedPageContent($(this));
            }
        });

        //delete the page contents
        $('#popup_btnconfirm').click(function() {

            pagedids = $('.record_id').val();
            deletePage();
            //
        });

        $('#popup_sendMail').click(function() {
            sendMail();

        });


        //cancel button
        $('#popup_btnconfirm_cancel').click(function ()
        {
            
            if ($(this).attr('redirect') == 'admin') {
                window.location.href = emailTemplatePath;
            } else {
                window.location.href = indexPath;
            }

            
        });



    
        $('#btn-save-charges').click(function ()
        {

            $('.job_customise .panel-box').find('.form-group').each(function ()
            {
                var charge_id = $(this).find('input[type=text]').attr('id')
                var charge_type = $(this).attr('charge-type') == 1 ? 'fixed' : $(`input[name="${charge_id}"]:checked`).val();
                var status =  $(this).find('.onoffswitch-checkbox')[0].checked
                
                var charge_value = $(this).find('input[type=text]').val();
                manageFields.saveCharges(charge_id, charge_type, charge_value,status);
               

            })
            toastr.success('Success! Fee settings was successfully saved.');
          
            
        });



       


        

    });
})();