// TODO(ahuszagh)
// Change this to a database query.

const adv_24hr_data = {
    'Impressions': 12345,
    'Impressions_trend' : '+12.21%',
    'Clicks': 352,
    'Clicks_trend': '-2.3%',
    'CPM' : 48.56,
    'CPM_trend' : '-32.01%',
    'Expenses' : '58994.21',
    'Expenses_trend' : '+302.5%',
    'Balance' : '0.01',
    'Balance_trend' : '-85%'
}

const pub_24hr_data = {
    'Impressions': 23456,
    'Impressions_trend' : '+12.21%',
    'Clicks': 352,
    'Clicks_trend': '-2.3%',
    'RPM' : 48.56,
    'RPM_trend' : '-32.01%',
    'Revenue' : '58994.21',
    'Revenue_trend' : '+302.5%',
    'Balance' : '0.01',
    'Balance_trend' : '-85%'
}

const fake_24hr_data = {
    adv_24hr_data,
    pub_24hr_data
}

export default fake_24hr_data;

