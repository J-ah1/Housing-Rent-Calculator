<cfcomponent displayname="User">

   <!---
      
      User Based Functions
   
   --->

   <!--- Return user info with a given username --->
   <cffunction name="getUserInfo" returntype="query" access="private">
      
      <cfargument name="username" type="string" required="true">

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
         SELECT *
         FROM hcUser
         WHERE username = <cfqueryparam value='#username#' cfsqltype='cf_sql_varchar' maxlength='50'>
      </cfquery>

      <cfreturn user>

   </cffunction>


   <!--- Check if username and password combination match --->
   <cffunction name="checkUser" returntype="boolean" returnFormat="JSON" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfset password = Hash('#password#', "SHA-512")>
      <cfset user = getUserInfo('#username#')>
      <cfreturn user.recordCount EQ 1 AND '#password#' EQ user.pswd>

   </cffunction>


   <!--- Validate arguments and query a new user into hcUser --->
   <cffunction name="registerUser" returntype="void" access="remote">
      
      
      <cfargument name="username" type="string" required="true">
      <cfargument name="firstname" type="string" required="true">
      <cfargument name="lastname" type="string" required="true">
      <cfargument name="password" type="string" required="true">
      <cfargument name="email" type="string" required="true">
      <cfargument name="phone" type="string" required="true">
      <cfargument name="squestion" type="string" required="true">
      <cfargument name="sanswer" type="string" required="true">


      <cfset password = Hash('#password#', "SHA-512")> 
      <cfset squestion = val('#squestion#')>

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
          INSERT INTO hcUser (username, fName, lName, pswd, email, phone, sQuestion, sAnswer)
          VALUES (<cfqueryparam value='#username#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#firstname#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#lastname#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#password#' cfsqltype='cf_sql_varchar' maxlength='128'>,
                  <cfqueryparam value='#email#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#phone#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#squestion#' cfsqltype='cf_sql_tinyint'>,
                  <cfqueryparam value='#sanswer#' cfsqltype='cf_sql_varchar' maxlength='50'>)
      </cfquery>


   </cffunction>



   <!--- Check if user in database and send corresponding security question --->
   <cffunction name="forgetPassword" returntype="numeric" returnFormat="JSON" access="remote">

      <cfargument name="username" type="string" required="true">

      <cfset user = getUserInfo('#username#')>
      <cfif user.recordCount EQ 1>
         <cfreturn val('#user.sQuestion#')>
      </cfif>

      <cfreturn -1>
   </cffunction>

   <!--- Check if user answer matches corresponding database record --->
   <cffunction name="checkSecurityAnswer" returntype="boolean" returnFormat="JSON" access="remote">

      <cfargument name="username" type="string" required="true">
      <cfargument name="answer" type="string" required="true">

      <cfset user = getUserInfo('#username#')>

      <cfreturn user.sAnswer EQ '#answer#'>
   </cffunction>
   

   <!--- Update a user's password in database --->
   <cffunction name="updateUserPassword" returntype="void" access="remote">
      <cfargument name="username" type="string" required="true">
      <cfargument name="password" type="string" required="true">

      <cfset password = Hash('#password#', "SHA-512")>

      <cfquery name="user" datasource="awsMicrosoftSQLServer">
            UPDATE hcUser
            SET   pswd = <cfqueryparam value='#password#' cfsqltype='cf_sql_varchar' maxlength='128'>
            WHERE username = <cfqueryparam value='#username#' cfsqltype='cf_sql_varchar' maxlength='50'>
      </cfquery>
   </cffunction>

   <!---
   
      Client Based Functions
   
   --->


   <!--- Return clientinfo with a given client ID --->
   <cffunction name="getClientInfo" returntype="query" access="private">
      <cfargument name="clientID" type="numeric" required="true">
      
      <!--- Query for client and return query --->
      <cfquery name="clientInfo" datasource="awsMicrosoftSQLServer">
         SELECT *
         FROM wfClient
         WHERE id = <cfqueryparam value='#clientID#' cfsqltype='cf_sql_integer'>
      </cfquery>
      <cfreturn clientInfo>
   </cffunction>

   <!--- Public return of clientinfo --->
   <cffunction name="clientProfile" returntype="query" returnFormat="JSON" access="remote">
      <cfargument name="clientID" type="string" required="true">
      <cfset clientID = val('#clientID#')>

      <cfset clientInfo=getClientInfo('#clientID#')>
      <cfreturn clientInfo>
   </cffunction>


   <!--- Return clientworksheets with a given client ID --->
   <cffunction name="getClientWorksheets" returntype="query" access="private">
      <!--- Query for client and return query --->
      <cfargument name="clientID" type="numeric" required="true">
      <cfquery name="clientWorksheets" datasource="awsMicrosoftSQLServer">
         SELECT id, dateSubmitted, rentSubsidyPayment
         FROM worksheet
         WHERE clientID = <cfqueryparam value='#clientID#' cfsqltype='cf_sql_integer'>
      </cfquery>
      <cfreturn clientWorksheets>
   </cffunction>

   <!--- Public return of clientworksheets --->
   <cffunction name="clientWorksheetProfile" returntype="query" returnFormat="JSON" access="remote">
      <cfargument name="clientID" type="string" required="true">
      <cfset clientID = val('#clientID#')>
      <cfset worksheets=getClientWorksheets('#clientID#')>
      <cfreturn worksheets>
   </cffunction>

   <!--- Return viewCWorksheet information for viewing --->
   <cffunction name="getCWorksheetData" returntype="query" access="private">
      <cfargument name="id" type="numeric" required="true">
      <cfquery name = "cWorksheetData" datasource="awsMicrosoftSQLServer">
         SELECT *
         FROM worksheet
         WHERE id = <cfqueryparam value='#id#' cfsqltype='cf_sql_integer'>
      </cfquery>
      <cfreturn cWorksheetData>
   </cffunction>

   <!--- Public return of getCWorksheetData --->
   <cffunction name="viewCWorksheets" returntype="query" returnFormat="JSON" access="remote">
      <cfargument name="id" type="string" required="true">
      <cfset id = val('#id#')>
      <cfset worksheet=getCWorksheetData('#id#')>
      <cfreturn worksheet>
   </cffunction>


   <!--- function that return clients whose name(s) match the input given --->
   <cffunction name="clientSearchRegex" returntype="query" access="private">
      <cfargument name="clientName" type="string" required="true">
      <cfset splitCName = listToArray(clientName, " ")>
      <cfset splitCName[1] = splitCName[1]&'%'>
      <cfif arrayLen(splitCName) GT 1>
         <cfset splitCName[2] = splitCName[2]&'%'>
      </cfif>


      <!--- if first and last name have been entered --->
      <cfif ArrayLen(splitCName) GT 1> 
         <cfquery name = "clientSearchSQL2" datasource="awsMicrosoftSQLServer">
               SELECT fName, lName, dob, id
               FROM wfClient
               WHERE fName LIKE  <cfqueryparam value='#splitCName[1]#' cfsqltype='cf_sql_varchar' maxlength='50'> AND lName LIKE <cfqueryparam value='#splitCName[2]#' cfsqltype='cf_sql_varchar' maxlength='50'>
         </cfquery>
         <cfreturn clientSearchSQL2>

      <!--- if only one name has been entered --->
      <cfelse>
         <cfquery name = "clientSearchSQL1" datasource="awsMicrosoftSQLServer">
               SELECT fName, lName, dob, id
               FROM wfClient
               WHERE fName LIKE <cfqueryparam value='#splitCName[1]#' cfsqltype='cf_sql_varchar' maxlength='50'> OR lName LIKE <cfqueryparam value='#splitCName[1]#' cfsqltype='cf_sql_varchar' maxlength='50'>
         </cfquery>
         <cfreturn clientSearchSQL1>
      </cfif> 
   </cffunction>

   <!--- function that return clients whose name(s) matches the input given --->
   <cffunction name="getCSearchRegex" returnFormat="JSON" access="remote">
      <cfargument name="clientName" type="string" required="true">
      <cfset clients= clientSearchRegex('#clientName#')>
      <cfreturn clients>
   </cffunction>


   <!---Insert Client into database--->
   <cffunction name="addClient" returntype="numeric" returnFormat="JSON" access="remote">

      <cfargument name="fName" type="string" required="true">
      <cfargument name="lName" type="string" required="true">
      <cfargument name="addStreet" type="string" default="" required="false">
      <cfargument name="addCity" type="string" default="" required="false">
      <cfargument name="addState" type="string" default="" required="false">
      <cfargument name="addZip" type="string" default="" required="false">
      <cfargument name="gender" type="string" required="true">
      <cfargument name="dob" type="string" required="true">

      <cfset gender = val('#gender#')>
      <cfset dob = parseDateTime(dob, "yyyy-mm-dd")>

      <cfquery name="addC2" datasource="awsMicrosoftSQLServer" result="newClient">
         INSERT INTO wfClient (fName, lName, addStreet, addCity, addState, addZip, gender, dob)
         VALUES (<cfqueryparam value='#fName#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#lName#' cfsqltype='cf_sql_varchar' maxlength='50'>, 
                  <cfqueryparam value='#addStreet#' null='#NOT len(trim(addStreet))#' cfsqltype='cf_sql_varchar' maxlength='100'>, 
                  <cfqueryparam value='#addCity#' null='#NOT len(trim(addCity))#' cfsqltype='cf_sql_varchar' maxlength='50'>, 
                  <cfqueryparam value='#addState#' null='#NOT len(trim(addState))#' cfsqltype='cf_sql_varchar' maxlength='50'>,
                  <cfqueryparam value='#addZip#' null='#NOT len(trim(addZip))#' cfsqltype='cf_sql_varchar' maxlength='10'>,
                  <cfqueryparam value='#gender#' cfsqltype='cf_sql_tinyint'>, 
                  <cfqueryparam value='#dob#' cfsqltype='cf_sql_date'>)
      </cfquery>

      <cfreturn #newClient["GENERATEDKEY"]#>

   </cffunction>

   <!---Insert Worksheet into database--->
   <cffunction name="addWorksheet" returntype="void" access="remote">
      <cfargument name="clientID" type="string" required="true">
      <!--- <cfargument name="userID" type="string" required="true"> --->
      <cfargument name="dateSubmitted" type="string" required="true">


      <cfargument name="annualHouseHoldWages" type="string" default="0.00" required="false">
      <cfargument name="periodicPayment" type="string" default="0.00" required="false">
      <cfargument name="unearnedIncome" type="string" default="0.00" required="false">
      <cfargument name="receivedIncome" type="string" default="0.00" required="false">
      <cfargument name="businessIncome" type="string" default="0.00" required="false">
      <cfargument name="investments" type="string" default="0.00" required="false">
      <cfargument name="armedForcesPay" type="string" default="0.00" required="false">
      <cfargument name="publicAssistanceReceived" type="string" default="0.00" required="false">
      <cfargument name="welfareReliant" type="string" default="0" required="false">
      <cfargument name="annualGrossIncome" type="string" default="0.00" required="false">
      <cfargument name="monthlyGrossIncome" type="string" default="0.00" required="false">

      <cfargument name="numDependents" type="string" default="0" required="false">
      <cfargument name="disabledDeduction" type="string" default="0.00" required="false">
      <cfargument name="childcareExp" type="string" default="0.00" required="false">
      <cfargument name="attendExp" type="string" default="0.00" required="false">
      <cfargument name="elderlyExp" type="string" default="0.00" required="false">
      <cfargument name="medExp" type="string" default="0.00" required="false">
      <cfargument name="perAGI" type="string" default="0.00" required="false">
      <cfargument name="medDeduction" type="string" default="0.00" required="false">
      
      <cfargument name="inHOPWA" type="string" default="0" required="false">
      <cfargument name="employmentIncomeIncrease" type="string" default="0" required="false">
      <cfargument name="selfSufficientIncome" type="string" default="0" required="false">
      <cfargument name="incomeWSixMo" type="string" default="0" required="false">
      <cfargument name="incomeIncreaseDate" type="string" default="" required="false">
      <cfargument name="baselineIncome" type="string" default="0.00" required="false">
      <cfargument name="incomeEID" type="string" default="0.00" required="false">
      <cfargument name="otherIncomeEID" type="string" default="0.00" required="false">
      <cfargument name="applicableEID" type="string" default="0.00" required="false">
      
      <cfargument name="totalAllowance" type="string" default="0.00" required="false">
      <cfargument name="annualAdjustedIncome" type="string" default="0.00" required="false">
      <cfargument name="monthlyAdjustedIncome" type="string" default="0.00" required="false">
      
      <cfargument name="totalMonthlyRent" type="string" default="0.00" required="false">
      <cfargument name="currentLeasePeriod" type="string" default="0.00" required="false">
      <cfargument name="utilitiesIncluded" type="string" default="0" required="false">
      <cfargument name="utilityAllowance" type="string" default="0.00" required="false">
      <cfargument name="tenantRentResponsibility" type="string" default="0.00" required="false">
      <cfargument name="rentSubsidyPayment" type="string" default="0.00" required="false">
      

      <cfset userID = 12>
      <cfset clientID = val('#clientID#')>
      
      <cfset dateSubmitted = parseDateTime(dateSubmitted, "yyyy-mm-dd")>
      <cfif len(trim(incomeIncreaseDate))>
         <cfset incomeIncreaseDate = parseDateTime(incomeIncreaseDate, "yyyy-mm-dd")>
      </cfif>
      
      <cfset welfareReliant = val('#welfareReliant#')>
      <cfset inHOPWA = val('#inHOPWA#')>
      <cfset employmentIncomeIncrease = val('#employmentIncomeIncrease#')>
      <cfset selfSufficientIncome = val('#selfSufficientIncome#')>
      <cfset incomeWSixMo = val('#incomeWSixMo#')>
      <cfset utilitiesIncluded = val('#utilitiesIncluded#')>
      
      <cfset numDependents = val('#numDependents#')>
      <cfset currentLeasePeriod = val('#currentLeasePeriod#')>

      <cfquery name="addedSheet" datasource="awsMicrosoftSQLServer">
         INSERT INTO worksheet
         VALUES (<cfqueryparam value='#userID#' cfsqltype='cf_sql_integer'>,
                  <cfqueryparam value='#clientID#' cfsqltype='cf_sql_integer'>, 
                  <cfqueryparam value='#dateSubmitted#' cfsqltype='cf_sql_date'>,

                  <cfqueryparam value='#annualHouseHoldWages#' cfsqltype='cf_sql_money'>,
                  <cfqueryparam value='#periodicPayment#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#unearnedIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#receivedIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#businessIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#investments#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#armedForcesPay#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#publicAssistanceReceived#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#welfareReliant#' cfsqltype='cf_sql_bit'>, 
                  <cfqueryparam value='#annualGrossIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#monthlyGrossIncome#' cfsqltype='cf_sql_money'>,

                  <cfqueryparam value='#numDependents#' cfsqltype='cf_sql_tinyint'>,
                  <cfqueryparam value='#disabledDeduction#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#childcareExp#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#attendExp#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#elderlyExp#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#medExp#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#perAGI#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#medDeduction#' cfsqltype='cf_sql_money'>,

                  <cfqueryparam value='#inHOPWA#' cfsqltype='cf_sql_bit'>, 
                  <cfqueryparam value='#employmentIncomeIncrease#' cfsqltype='cf_sql_bit'>, 
                  <cfqueryparam value='#selfSufficientIncome#' cfsqltype='cf_sql_bit'>,
                  <cfqueryparam value='#incomeWSixMo#' cfsqltype='cf_sql_bit'>,
                  <cfqueryparam value='#incomeIncreaseDate#' null='#NOT len(trim(incomeIncreaseDate))#' cfsqltype='cf_sql_date'>, 
                  <cfqueryparam value='#baselineIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#incomeEID#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#otherIncomeEID#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#applicableEID#' cfsqltype='cf_sql_money'>, 

                  <cfqueryparam value='#totalAllowance#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#annualAdjustedIncome#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#monthlyAdjustedIncome#' cfsqltype='cf_sql_money'>,

                  <cfqueryparam value='#totalMonthlyRent#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#currentLeasePeriod#' cfsqltype='cf_sql_tinyint'>,
                  <cfqueryparam value='#utilitiesIncluded#' cfsqltype='cf_sql_bit'>, 
                  <cfqueryparam value='#utilityAllowance#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#tenantRentResponsibility#' cfsqltype='cf_sql_money'>, 
                  <cfqueryparam value='#rentSubsidyPayment#' cfsqltype='cf_sql_money'>)
      </cfquery>


   </cffunction>


   <!---
   
      Debugging Functions (Delete Later)
   
   --->


   <!--- Unit test for simple non SQL INSERT functions --->
   <cffunction name="nonInsertTest" returntype="void" access="remote">

      <cfset testUserName = "sharkeisha">
      <cfset testUserPass = "testPass">
      <cfset testUserSQuestion = 0>
      <cfset invalidSQuestion = -1>

      <cfset checkUserTest = checkUser('#testUserName#', '#testUserPass#')>
      <cfoutput>getUserInfo()_checkUser()_test1: #checkUserTest#</cfoutput>

      <cfset forgetPasswordTest = forgetPassword('#testUserName#') EQ #testUserSQuestion#>
      <cfoutput>forgetPassword()_test1: #forgetPasswordTest#</cfoutput>
      <cfset forgetPasswordTest = forgetPassword('INVALIDUSER') EQ #invalidSQuestion#>
      <cfoutput>forgetPassword()_test1: #forgetPasswordTest#</cfoutput>

      <cfset checkSecurityAnswerTest = checkSecurityAnswer('#testUserName#', 'emptyAnswer')>
      <cfoutput>checkSecurityAnswer()_test1: #checkSecurityAnswerTest#</cfoutput>
      <cfset checkSecurityAnswerTest = checkSecurityAnswer('#testUserName#', '') EQ false>
      <cfoutput>checkSecurityAnswer()_test2: #checkSecurityAnswerTest#</cfoutput>

      <cfset testClientID = 1>
      <cfset testClientProfileFName = "tom">
      <cfset testClientWorksheetProfileDateSubmitted = "2013-03-04">
      <cfset testClientSearch1 = "t">
      <cfset testClientSearch2 = "h">
      <cfset testClientSearch3 = "tom h">

      <cfset clientProfileTest = clientProfile('#testClientID#').fName EQ '#testClientProfileFName#'>
      <cfoutput>getClientInfo()_clientProfile()_test1: #clientProfileTest#</cfoutput>

      <!--- Technically should test for multiple worksheets --->
      <cfset clientWorksheetProfileTest = clientWorksheetProfile('#testClientID#').dateSubmitted EQ '#testClientWorksheetProfileDateSubmitted#'>
      <cfoutput>getClientWorksheets()_clientWorksheetProfile()_test1: #clientWorksheetProfileTest#</cfoutput>

      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch1#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test1: #clientProfileTest#</cfoutput>
      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch2#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test2: #clientProfileTest#</cfoutput>
      <cfset getCSearchRegexTest = getCSearchRegex('#testClientSearch3#').id EQ #testClientID#>
      <cfoutput>getCSearchRegex()_clientSearchRegex()_test3: #clientProfileTest#</cfoutput>

   </cffunction>

</cfcomponent>