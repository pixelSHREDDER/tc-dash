import PropTypes from 'prop-types';
import { format as formatDate } from 'date-fns';

// TODO: replace with call to imported function to get proper value
const ipGeoBlockAuthNonce = 'abc123';

const createDonationsExportBody = (startDate = null, endDate = null) => {
    if (!startDate) startDate = new Date();
    if (!endDate) endDate = new Date();

    return {
        'start_year': startDate.year,
        'start_month': startDate.month,
        'end_year': endDate.year,
        'end_month': endDate.month,
        'give-action': 'earnings_export'
    }
}

const createDonorsExportBody = (startDate = null, endDate = null) => {
    return {
        'form': 
        `donor_export_start_date=${startDate ? formatDate(startDate, 'YYYY-MM-DD') : ''}&donor_export_end_date=${endDate ? formatDate(endDate, 'YYYY-MM-DD') : ''}&forms=0&give_export_option%5Bfull_name%5D=on&give_export_option%5Bemail%5D=on&give_export_option%5Baddress%5D=on&give_export_option%5Buserid%5D=on&give_export_option%5Bdonor_created_date%5D=on&give_export_option%5Bdonations%5D=on&give_export_option%5Bdonation_sum%5D=on&give_ajax_export=e1d21cc627&_wp_http_referer=%2Fwp-admin%2Fedit.php%3Fpost_type%3Dgive_forms%26page%3Dgive-tools%26ip-geo-block-auth-nonce%3D${ipGeoBlockAuthNonce}&give-export-class=Give_Batch_Donors_Export&give_export_option%5Bquery_id%5D=give_5d1fe9ad5ae71`,
        'action': 'give_do_ajax_export',
        'step': 1,
        'ip-geo-block-auth-nonce': ipGeoBlockAuthNonce
    }
}

const getCSVDonations = (domain, startDate = null, endDate = null) => {
    const body = createDonationsExportBody(startDate, endDate);
    fetch(`${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&ip-geo-block-auth-nonce=${ipGeoBlockAuthNonce}`, {
        /*headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },*/
        method: 'post',
        //referer: `${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&ip-geo-block-auth-nonce=${ipGeoBlockAuthNonce}`,
        body: body
    });
    //}).then()
    //window.open(url, '_blank');
}

const getCurrentYearPDFDonations = (domain) => {
    fetch(`https://${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&give-action=generate_pdf&ip-geo-block-auth-nonce=${ipGeoBlockAuthNonce}`, {
        /*headers: {
            'content-type': 'application/pdf'
        },*/
        method: 'get'
    });
}

const getCSVDonors = (domain, startDate = null, endDate = null) => {
    const body = createDonorsExportBody(startDate, endDate);
    fetch(`${domain}/wp-admin/admin-ajax.php`, {
        /*headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },*/
        method: 'post',
        //referrer: `${domain}/wp-admin/edit.php?post_type=give_forms&page=give-tools&ip-geo-block-auth-nonce=${ipGeoBlockAuthNonce}`
        body: body
    });
}

createDonationsExportBody.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
};

createDonorsExportBody.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
};

getCSVDonations.propTypes = {
    domain: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
};

getCurrentYearPDFDonations.propTypes = {
    domain: PropTypes.string.isRequired,
};

getCSVDonors.propTypes = {
    domain: PropTypes.string.isRequired,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
};

export {
    getCSVDonations,
    getCurrentYearPDFDonations,
    getCSVDonors
};