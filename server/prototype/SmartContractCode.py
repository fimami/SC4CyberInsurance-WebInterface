contract_content = """
        pragma solidity 0.7.1;
        pragma experimental ABIEncoderV2;

        import "provableAPI.sol";  //Importing Provable

        contract InsurerSCDynamic is usingProvable{{
            string constant customer_name = "{}";
            uint constant start_date = {};
            uint constant end_date = {};
            uint constant payment_frequency  = {};
            uint constant cancellation_penalty = {};
            uint premium  = {};
            uint constant initial_premium = {};
            string json_hash = "{}";
            uint valid_until = start_date;
            bool valid = false;
            address payable customer_address;
            address insurer_address;
            mapping (uint => Reported_Damage) reported_damages;
            uint count_of_damages = 0;
            uint[50] list_of_damage_ids;
            uint proposed_new_premium;
            string proposed_new_json_hash;
            bool new_proposal_available = false;
            address address_of_accepting_party;
            uint exchange_rate;
        
            constructor(address payable company_address) public {{
              insurer_address = msg.sender;
              customer_address = company_address;
              OAR = OracleAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);
              //fixed exchange rate (from august 2021):
              exchange_rate = 2700;
            }}

            //checks the msg.sender of the call()
            //function getMsgSender() public view returns (address) {{
            //    return msg.sender;
            //}}

            function balanceOfSC() public view returns (uint) {{
                return address(this).balance;
            }}

            function getInitialPremium() public view returns (uint) {{
                return initial_premium;
            }}
            
            function getValidUntil() public view returns (uint) {{
               return valid_until;
            }}

            function getValidBool() public view returns (bool) {{
                return valid;
            }}
                        
            function getExchangeRate() public view returns (uint) {{
                return exchange_rate;
            }}
            
            function getPremium() public view returns (uint) {{
                return premium;
            }}
            
            function isNewProposalAvailable() public view returns (bool) {{
                return new_proposal_available;
            }}
            
            function getHashOfProposal() public view returns (string memory) {{
                return proposed_new_json_hash;
            }}
            
            //not used:
            //function getDamageWithID (uint damage_id) public view returns (Reported_Damage memory){{
            //   require(
            //      customer_address == msg.sender || insurer_address == msg.sender,
            //      "Only the registered customer or the insurer can get the damage infos."
            //   );
            //   return reported_damages[damage_id];
            //}}
            
            function getAllReportedDamages () public view returns (Reported_Damage[100] memory){{
               //The msg.sender here is always fixed (first ganache account); conditional statement not needed
               //An option would be to take the sender address as a parameter
               //require(
               //   customer_address == msg.sender || insurer_address == msg.sender,
               //   "Only the registered customer or the insurer can get the damage infos."
               //);
                Reported_Damage [100] memory allDamages;
               //Reported_Damage [count_of_damages] memory allDamages;
               for (uint i=0; i<count_of_damages; i++) {{
                    allDamages[i] = reported_damages[list_of_damage_ids[i]];
                }}
               return allDamages;
            }}
            
            //not used:
            //function getAllReportedDamagesWithStatus (StatusDamage status) public view returns (Reported_Damage[100] memory){{
            //   require(
            //      customer_address == msg.sender || insurer_address == msg.sender,
            //      "Only the registered customer or the insurer can get the damage infos."
            //   );
            //   Reported_Damage[100] memory allDamagesWithStatus;
            //   uint count = 0;
            //   for (uint i=0; i<count_of_damages; i++) {{
            //        if(reported_damages[list_of_damage_ids[i]].status == status){{
            //            allDamagesWithStatus[count] = reported_damages[list_of_damage_ids[i]];
            //            count++;
            //        }}
            //    }}
            //   return allDamagesWithStatus;
            //}}
            
            enum StatusDamage {{ New, Paid, UnderInvestigation, Dispute, Resolved, Canceled }}
            
            struct Reported_Damage {{
                uint date_of_damage;
                uint amount_of_damage;
                StatusDamage status;
                uint damage_id;
                string type_of_attack;
                string logfile_hash;
                string decline_reason;
                uint counter_offer;
            }}
        
            function paySecurity() public payable {{
                require(
                    customer_address == msg.sender,
                    "Only the registered customer can pay the security."
                );
                uint security_in_wei = convertEuroToWei(premium) / 100 * cancellation_penalty;
                require(
                    msg.value >= security_in_wei,
                    "Not enough Ether provided to pay the security."
                );
                require(
                    !valid,
                    "Security was already payed before."
                );
                valid = true;
                //refund the extra paid
                msg.sender.transfer(msg.value - security_in_wei);
            }}
        
            function payPremium() public payable returns (uint){{
                require(
                    customer_address == msg.sender,
                    "Only the registered customer can pay the premium."
                );
                uint premium_in_wei = convertEuroToWei(premium);
                // if its the last premium, the already paid security is subtracted from the premium
                if(valid_until + payment_frequency >= end_date){{
                    uint security_in_wei = convertEuroToWei(initial_premium) / 100 * cancellation_penalty; 
                    premium_in_wei = premium_in_wei - security_in_wei;
                }}
                require(
                    msg.value >= premium_in_wei,
                    "Not enough Ether provided to pay the premium."
                );
                require(
                    valid,
                    "Have to pay the security first, because otherwise the contract is not valid."
                );
                require(
                    valid_until < end_date,
                    "End date of the contract is reached. No need to pay additional premiums."
                );
                increaseTimeOfValidity();
                //refund the extra paid
                msg.sender.transfer(msg.value - premium_in_wei);
                return valid_until;
            }}
        
            function convertEuroToWei (uint numberOfEuros) private returns (uint) {{
                return (numberOfEuros * 1000000000000000000 / exchange_rate);
            }}
            
            function __callback(
                bytes32 myid,
                string memory result
            ) public override {{
                //emit NewTemp(result);
                require(msg.sender == provable_cbAddress(),
                "Wrong sender of callback.");
                 exchange_rate = uint(parseInt(result));
            }}
        
            function updateExchangeRate() public payable {{
                uint price = provable_getPrice("URL");
                require( price <= msg.value,
                    "Provable query was NOT sent, please add some ETH to cover for the query fee."
                );
                provable_query("URL", "json(https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=EUR).EUR");
                msg.sender.transfer(msg.value - price);
            }}   
        
            function increaseTimeOfValidity () private {{
                valid_until = valid_until + payment_frequency;
            }}
                
            function reportDamage(uint date_of_damage, 
                                uint amount_of_damage, 
                                uint damage_id, 
                                string memory type_of_attack,
                                string memory logfile_hash) public{{
                require(
                    customer_address == msg.sender,
                    "Only the registered customer can report a damage."
                );                                
                require(
                    date_of_damage > start_date && date_of_damage <= valid_until,
                    "The contract was not valid at the date of damage."
                 );
                //check if the id is already given away -> null check?
                require(
                    reported_damages[damage_id].amount_of_damage == 0,
                    "Already exists a damage with the selected id."
                );
                
                reported_damages[damage_id] = Reported_Damage(date_of_damage, amount_of_damage,
                                                       StatusDamage.New, damage_id, type_of_attack, logfile_hash, "", 0);
                list_of_damage_ids[count_of_damages] = damage_id;
                count_of_damages = count_of_damages + 1;
                //find a way when automatic pay out is acceptable
                //->f.e. when it does not happen to many times and when the damage is low
                //it can still be checked at random afterwards when there is no trust
                //if(amount_of_damage < premium && count_of_damages < 4){{
                //    automaticPayOut(damage_id, false);
                //}}
            }}
            
            function cancelDamage(uint damage_id) public {{
                require(
                  customer_address == msg.sender,
                  "Only the registered customer can cancel a reported damage."
               );
               StatusDamage current_status = reported_damages[damage_id].status;          
               require(
                  current_status != StatusDamage.Paid && current_status != StatusDamage.Resolved,
                  "This damage is already paid or resolved otherwise."
               );
               reported_damages[damage_id].status = StatusDamage.Canceled;
            }}
        
            function automaticPayOut (uint damage_id, bool is_counter_offer) private {{      
               StatusDamage current_status = reported_damages[damage_id].status;          
               require(
                  current_status != StatusDamage.Paid && current_status != StatusDamage.Canceled && current_status != StatusDamage.Resolved,
                  "This damage is already paid, deleted or resolved otherwise."
               );
               uint payOutInWei = 0;
               if(is_counter_offer){{
                    payOutInWei = convertEuroToWei(reported_damages[damage_id].counter_offer);
               }}else{{
                    payOutInWei = convertEuroToWei(reported_damages[damage_id].amount_of_damage);
               }}
            
               require(
                    address(this).balance >= payOutInWei,
                    "Not enough Ether available in the contract."
               );
               customer_address.transfer(payOutInWei);
               reported_damages[damage_id].status = StatusDamage.Paid;
            }}
        
            function approveNonAutomaticPayment (uint damage_id) public {{
               require(
                  customer_address == msg.sender,
                  "Only the registered customer can approve the non automatic payment."
               );
               reported_damages[damage_id].status = StatusDamage.Paid;
            }}
            
            function acceptDamage(uint damage_id) public payable{{
                require(
                  insurer_address == msg.sender,
                  "Only the insurer can accept a reported damage."
               );
                //check if the damage exists
                //require(
                //    reported_damages[damage_id].amount_of_damage != 0,
                //    "There is no damage with the selected id."
                //);
                automaticPayOut(damage_id, false);
            }}
            
            function declineDamage(uint damage_id, string memory reason, uint counter_offer) public payable{{
                require(
                  insurer_address == msg.sender,
                  "Only the insurer can decline a reported damage."
               );
               StatusDamage current_status = reported_damages[damage_id].status;          
               require(
                  current_status == StatusDamage.New || current_status == StatusDamage.Dispute,
                  "To create a counter offer, the status of the damage must be new or in dispute."
               );
               if(current_status == StatusDamage.Dispute){{
                    require(
                        reported_damages[damage_id].counter_offer < counter_offer,
                        "If a new counter_offer is proposed, it must be better than the last time."
                    );
               }}
            
                uint value_of_counter_offer = convertEuroToWei(counter_offer);
               require(
                    address(this).balance >= value_of_counter_offer,
                    "Not enough Ether available in the contract to propose counter offer."
               );
               
               reported_damages[damage_id].status = StatusDamage.UnderInvestigation;
               reported_damages[damage_id].decline_reason = reason;
               reported_damages[damage_id].counter_offer = counter_offer;
            }}
            
            function acceptCounterOffer(uint damage_id) public {{
                require(
                  customer_address == msg.sender,
                  "Only the registered customer can accept a counteroffer."
               );
                require(
                  reported_damages[damage_id].status == StatusDamage.UnderInvestigation,
                  "Only when a counteroffer is currently open it can be accepted or declined."
               );
               automaticPayOut(damage_id, true);
            }}
            
            function declineCounterOffer(uint damage_id) public {{
                require(
                  customer_address == msg.sender,
                  "Only the registered customer can decline a counteroffer."
               );
                require(
                  reported_damages[damage_id].status == StatusDamage.UnderInvestigation,
                  "Only when a counteroffer was given it can be accepted or declined."
               );
               reported_damages[damage_id].status = StatusDamage.Dispute;
            }}
            
            function resolveDispute(uint damage_id) public {{
                require(
                  customer_address == msg.sender,
                  "Only the registered customer can resolve a dispute."
               );
                require(
                  reported_damages[damage_id].status == StatusDamage.Dispute,
                  "Only when there is a dispute it can be resolved."
               );
               reported_damages[damage_id].status = StatusDamage.Resolved;
            }}
        
            function proposeToUpdateContract (uint new_premium, string memory new_json_hash) public{{
               require(
                    !new_proposal_available,
                    "Already a proposal available."
               );
               require(
                    customer_address == msg.sender || insurer_address == msg.sender,
                    "Only the customer or the insurer can propose to update the contract."
               );
               if(customer_address == msg.sender){{
                    address_of_accepting_party = insurer_address;
               }} else{{
                    address_of_accepting_party = customer_address;
               }}
               proposed_new_premium = new_premium;
               proposed_new_json_hash = new_json_hash;
               new_proposal_available = true;
            }}
        
            function agreeToUpdateContract () public{{
                   require(
                      address_of_accepting_party == msg.sender,
                      "Only the other party who did not make the proposal can accept the proposal to update the contract."
                   );
                   require(
                      new_proposal_available,
                      "There is no proposal available to accept."
                   );                   
                   premium = proposed_new_premium;
                   json_hash = proposed_new_json_hash;
                   new_proposal_available = false;
            }}
            
            function declineToUpdateContract () public{{
                   require(
                      address_of_accepting_party == msg.sender,
                      "Only the other party who did not make the proposal can decline the proposal to update the contract."
                   );
                   require(
                      new_proposal_available,
                      "There is no proposal available to decline."
                   );                   
                   new_proposal_available = false;
            }}
        
            function annulTheContract () public{{
               require(
                  insurer_address == msg.sender,
                  "Only the insurer can annul the contract."
               );
               require(
                // define the time of not paying,
                // when it is possible for the insurer to annul the contract
                // for example after 2 weeks of not paying
                  valid_until < block.timestamp + 1,
                  "The insurer can not annul the contract, because the customer payed its premium."
               );
               valid = false;
               //delete contract here?
            }}
            
            function getWeiFromContract (uint amountOfWei) public {{
                require(
                    insurer_address == msg.sender,
                    "Only the insurer can take the currency from the contract."
                );
               require(
                    address(this).balance >= amountOfWei,
                    "Not enough Ether available in the contract."
               );
               msg.sender.transfer(amountOfWei);
            }}
            
            function payWeiToContract () public payable{{
                require(
                    insurer_address == msg.sender,
                    "Only the insurer can pay currency to the contract."
                );
            }}
        }}

                 """