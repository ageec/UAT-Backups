import { LightningElement, api, track, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';

export default class PerformanceAndMetrics extends LightningElement {

    @api tab1Label = 'Overview';
    @api dashboard1ApiName = '0FKPH0000000Siz4AE';

    @api tab2Label = 'Development';
    @api dashboard2ApiName = '0FKPH0000000kKk4AI';

    @api tab3Label = 'Gift Officers';
    @api dashboard3ApiName = '0FKPH0000000Siw4AE';

    @api tab4Label = 'Med Gift Officers';
    @api dashboard4ApiName = '0FKPH0000000Six4AE';

    @api tab5Label = 'Medical Advancement';
    @api dashboard5ApiName = '0FKPH0000000Siy4AE';

    @api tab6Label = 'Philanthropic Strategy';
    @api dashboard6ApiName = '0FKPH0000000Sj04AE';

    @api tab7Label = 'Philanthropic Strategy Officers';
    @api dashboard7ApiName = '0FKPH0000000Sj14AE';

    @api tab8Label = 'Principal Gifts';
    @api dashboard8ApiName = '0FKPH0000000Sj24AE';

    @api tab9Label = 'Territories';
    @api dashboard9ApiName = '0FKPH0000000Sj34AE';

    @track activeTab = 'tab1';

    // Filter values from URL
    @track _giftOfficerTeam     = '';
    @track _giftOfficerTeamSort = '';
    @track _schoolUnit          = '';
    @track _giftOfficerDivision = '';
    @track _donorTerritory      = '';
    @track _donorTerritorySort  = '';

    // URL format example:
    // /lightning/n/PerformanceAndMetricsFlexibleURL?c__tab=2&c__giftOfficerTeam=  &c__giftOfficerTeamSort=
    // /lightning/n/PerformanceAndMetricsFlexibleURL?c__tab=6&c__schoolUnit=
    // /lightning/n/PerformanceAndMetricsFlexibleURL?c__tab=7&c__giftOfficerDivision=
    // /lightning/n/PerformanceAndMetricsFlexibleURL?c__tab=9&c__donorTerritory=   &c__donorTerritorySort=

    @wire(CurrentPageReference)
    handlePageRef(pageRef) {
        if (!pageRef?.state) return;
        const s = pageRef.state;
        if (s.c__tab)                 this.activeTab             = `tab${s.c__tab}`;
        if (s.c__giftOfficerTeam)     this._giftOfficerTeam      = s.c__giftOfficerTeam;
        if (s.c__giftOfficerTeamSort) this._giftOfficerTeamSort  = s.c__giftOfficerTeamSort;
        if (s.c__schoolUnit)          this._schoolUnit           = s.c__schoolUnit;
        if (s.c__giftOfficerDivision) this._giftOfficerDivision  = s.c__giftOfficerDivision;
        if (s.c__donorTerritory)      this._donorTerritory       = s.c__donorTerritory;
        if (s.c__donorTerritorySort)  this._donorTerritorySort   = s.c__donorTerritorySort;
    }

    handleTabChange(event) {
        this.activeTab = event.detail.value;
    }

    // tabs 1, 5, 8 — no filter
    get state1() { return undefined; }
    get state5() { return undefined; }
    get state8() { return undefined; }

    // tabs 2, 3, 4 — Gift_Officer_Team_To_2 step, GiftOfficerTeam field
    get state2() { return this._buildTeamState(); }
    get state3() { return this._buildTeamState(); }
    get state4() { return this._buildTeamState(); }

    // tab 6 — School_Unit_Toggle_1 step, Opportunity.Component.SchoolUnitToggle field
    get state6() {
        if (!this._schoolUnit) return undefined;
        return JSON.stringify({
            steps: {
                School_Unit_Toggle_1: {
                    metadata: { groups: ['Opportunity.Component.SchoolUnitToggle'] },
                    values: [this._schoolUnit]
                }
            }
        });
    }

    // tab 7 — Gift_Officer_Divisio_1 step, GiftOfficerDivision field
    get state7() {
        if (!this._giftOfficerDivision) return undefined;
        return JSON.stringify({
            steps: {
                Gift_Officer_Divisio_1: {
                    metadata: { groups: ['GiftOfficerDivision'] },
                    values: [this._giftOfficerDivision]
                }
            }
        });
    }

    // tab 9 — Territory_Toggle_1 step, DonorTerritory + DonorTerritorySort fields
    get state9() {
        if (!this._donorTerritory) return undefined;
        return JSON.stringify({
            steps: {
                Territory_Toggle_1: {
                    metadata: { groups: ['DonorTerritory', 'DonorTerritorySort'] },
                    values: [[this._donorTerritory, this._donorTerritorySort]]
                }
            }
        });
    }

    _buildTeamState() {
        if (!this._giftOfficerTeam) return undefined;
        return JSON.stringify({
            steps: {
                Gift_Officer_Team_To_2: {
                    metadata: { groups: ['GiftOfficerTeam', 'GiftOfficerTeamSort'] },
                    values: [[this._giftOfficerTeam, this._giftOfficerTeamSort]]
                }
            }
        });
    }

}