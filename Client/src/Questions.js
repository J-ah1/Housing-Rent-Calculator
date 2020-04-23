export const calcQuestions = {
    "annualHouseholdWages": {
      "label": "Annual household wages and earnings (before taxes)",
      "description": "Include the full amount (before payroll deductions) of annual wages and salaries, overtime pay, commissions, fees, tips and bonuses, and other compensation for personal services prior to payroll deductions. ALL INCOME MUST BE ANNUALIZED.",
      'type': 'dollar',
      'notes': ''
    },
    "periodicPayment": {
      "label": "Periodic payments (social security, retirement funds, annuities, etc.)",
      "description": "Include periodic payments from Social Security, annuities, insurance policies, retirement funds, pensions, disability or death benefits, excluding lump sum payments for the delayed start of a periodic payment. ALL INCOME MUST BE ANNUALIZED.",
      'type': 'dollar',
      'notes': ''    
    },
    "unearnedIncome": {
      "label": "Payments in lieu of earnings",
      "description": "Include unemployment, disability, worker's compensation, and severance pay.",
      'type': 'dollar',
      'notes': ''
    },
    "receivedIncome": {
      "label": "Alimony, child support, regular contributions or gifts received",
      "description": "Periodic payments received including alimony and child support, and regular contributions or gifts received from organizations or persons (including family members) not residing in the household.",
      'type': 'dollar',
      'notes': '' 
    },
    "businessIncome": {
      "label": "Net income from operation of a business of profession",
      "description": "Net income from operation of a business or profession (including but NOT limited to hairbraiding, day labor work, etc.).",
      'type': 'dollar',
      'notes': ''
    },
    "investments": {
      "label": "Investments and rental income in excess of $5,000 per year",
      "description": "Interest, dividends, and other net income of any kind from real or personal property. Where net family assets are in excess of $5,000, annual income shall include the greater of actual income derived from net family assets or a percentage of the value of such assets based on the current passbook savings rate, as determined by HUD.",
      'type': 'dollar',
      'notes': ''
    },
    "armedForcesPay": {
      "label": "Pay and allowances of a member of the armed forces",
      "description": "Include all regular pay, special pay and allowances of a member of the Armed Forces (except Hostile Fire Pay).",
      'type': 'dollar',
      'notes': ''
    },
    "publicAssistanceRecieved": {
      "label": "Public assistance received",
      "description": "Public Assistance, including cash payments made to household members under other programs funded, separately or jointly, by federal, state, or local governments which are not excluded by Federal Statutes. Includes cash payments to household members made by the HIV/AIDS Services Administration (HASA).",
      'type': 'dollar',
      'notes': ''
    },
    "welfareReliant": {
      "label": "Is the consumer/household solely dependent on Public Assistance?",
      "description": "If houseshold solely receives income from public assistance, tenant rent contribution shall equal $0.",
      'type': 'radio',
      'notes': ''
    },
    "annualGrossIncome": {
      "label": "Annual Gross Income",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: Add fields 1-8 '
    },
    "monthlyGrossIncome": {
      "label": "Monthly Gross Income",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: Annual Gross Income / 12'
    },
    "numDependents": {
      "label": "Number of dependents in the household",
      "description": "Dependents include household members under the age of 18, elderly dependents, handicapped, disabled, or full-time students, but not the family head of household, spouse or foster children.",
      'type': 'number',
      'notes': ''
    },
    "disabledDeduction": {
      "label": "$400 for elderly or disabled family member",
      "description": "This $400 deduction always applies to households with persons with HIV or AIDS if they are the head/co-head, spouse, or sole member, OR when the head/co-head, spouse, or sole member is at least 62 years of age. ($400 is given one time only at each calculation and/or re-calculation of income.)",
      'type': 'dollarDisabled',
      'notes': ''
    },
    "childcareExp": {
      "label": "Reasonable childcare expenses (Annual)",
      "description": "These are expenses anticipated during the year for children 12 years of age or younger that enable a household member to work, seek employment, or to further their education. Deductible expenses for childcare to enable a person to work shall not exceed the amount of income received from such work. Childcare cannot be paid to another member of the household. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED)",
      'type': 'dollar',
      'notes': ''
    },
    "attendExp": {
      "label": "Attendant care expenses for non-elderly, disabled family members",
      "description": "This allowance covers reasonable expenses anticipated during the period for attendant care (provided by a non-household member) and/or auxiliary apparatus for any disabled household member that enables that person or any other household member to work. Deduction may not exceed the amount of income generated by the person enabled to work. (ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)",
      'type': 'dollar',
      'notes': ''
    },
    "elderlyExp": {
      "label": "Medical expenses and/or assistance for elderly or disabled family members",
      "description": "(ONLY EXPENSES NOT REIMBURSED FROM ANY OTHER SOURCES ARE ALLOWED.)",
      'type': 'dollar',
      'notes': ''
    },
    "medExp": {
      "label": "Total Non-Reimbursed Medical Expenses",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: Add fields 15 and 16'
    },
    "perAGI": {
      "label": "3% of Annual Gross Income",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: Annual Gross Income * .03'
    },
    "medDeduction": {
      "label": "Total Allowable Medical Expense Deduction",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: the Amount from 17 that exceeds 18, if result is a negative number then 0'
    },
    "inHOPWA": {
      "label": "Is a member of the household receiving assistance through HOPWA, SHP, HOME, or Section 8?",
      "description": "",
      'type': 'radio',
      'notes': ''
    },
    "employmentIncomeIncrease": {
      "label": "Household earned income increased as a result of employment, after a period of unemployment of one or more years prior to employment?",
      "description": "For local minimum wage: https://www.dol.gov/whd/minwage/america.htm",
      'type': 'radio',
      'notes': ''
    },
    "selfSufficientIncome": {
      "label": "Household earned income increased as a result of participation in an economic self-sufficiency program or other job-training program?",
      "description": "",
      'type': 'radio',
      'notes': ''
    },
    "incomeWSixMo": {
      "label": "Household's earned income increases as a result of employment during or within six (6) months after receiving assistance, benefits, or services under TANF or a Welfare-to-Work program?",
      "description": "This includes a one time only cash assistance of at least $500.",
      'type': 'radio',
      'notes': ''
    },
    "incomeIncreaseDate": {
      "label": "Effective date of increase in earned income",
      "description": "",
      'type': 'date',
      'notes': ''
    },
    "baselineIncome": {
      "label": "Pre-Qualifying/Baseline Income",
      "description": "Enter the total income including earned and unearned, prior to qualifying event for the EID family member.",
      'type': 'dollar',
      'notes': ''
    },
    "incomeEID": {
      "label": "Current earned (employment) income of EID family member",
      "description": "",
      'type': 'dollar',
      'notes': ''
    },
    "otherIncomeEID": {
      "label": "Other current income of EID family member",
      "description": "",
      'type': 'dollar',
      'notes': ''
    },
    "applicableEID": {
      "label": "Applicable Earned Income Disregard",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: Exclusion amount = (26 + 27) - 25\nIf currently in the first 12-month exclusion period (based on \"Effective date of increase in earned income\" and current date) Then Full Exclusion amount, If currently in the second 12-month exclusion period then 50% of Exclusion amount'
    },
    "totalAllowance": {
      "label": "Total Allowances",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: (Field 12) * 480 + (Field 13) + (Field 14) + (Field 19) + (Field 28)'
    },
    "annualAdjustedIncome": {
      "label": "Annual Adjusted Income",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: (Field 29) - (Field 30)'
    },
    "monthlyAdjustedIncome": {
      "label": "Monthly Adjusted Income",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: (Field 31) / 12'
    },
    "totalMonthlyRent": {
      "label": "Total monthly rent per current lease agreement",
      "description": "",
      'type': 'dollar',
      'notes': ''
    },
    "currentLeasePeriod": {
      "label": "Current lease period (in months)",
      "description": "Specify the current lease period in months: e.g. 12 months, 24 months, etc.",
      'type': 'numeric',
      'notes': ''
    },
    "utilitiesIncluded": {
      "label": "Are utilities included in the rent?",
      "description": "",
      'type': 'radio',
      'notes': ''
    },
    "utilityAllowance": {
      "label": "Utility allowance",
      "description": "A tenant is only eligible for a utility allowance if utilities are NOT included in the rent charge. Copies of HUD-approved utility allowance charts may be obtained from local Housing Authorities and are updated periodically.",
      'type': 'dollar',
      'notes': ''
    },
    "tenantRentResponsibility": {
      "label": "Tenant Rent Responsibility",
      "description": "This is the amount the tenant pays, minus the utility allowance, if applicable. If this is a negative number, this is the amount to be reimbursed to the tenant or paid to the utility company on the tenant's behalf with their consent. The program pays the full amount of the rent (line 23) to the landlord.",
      'type': 'total',
      'notes': 'Calculated using one of the following methods:\nMethod 1:\n30% of Monthly Adjusted Income\nMethod 2:\n10% of Monthly Gross Income\nMethod 3: \n30% of Monthly Gross Income\n\nIf "Is the client solely dependent on Public Assistance" equals "Yes" then $0.00. \nIf an amount was entered for "Public assistance received" and any other income was entered then use Method 3. Otherwise use the higher value of Method 1 or Method 2.\n\nIf utilities are paid separately then Subtract Utility allowance'
    },
    "rentSubsidyPayment": {
      "label": "Rent Subsidy Payment",
      "description": "",
      'type': 'total',
      'notes': 'Calculation: (Field 33) - (Field 37)\nIf tenant Rent Responsibility is a negative number then subsidy payment should be the same as rent amount (Field 33)'
    }
  }