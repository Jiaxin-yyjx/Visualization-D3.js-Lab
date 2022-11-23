d3.queue()
.defer(d3.json, "data/us-states.json")
.defer(d3.csv, "data/state_Gen.csv")
.defer(d3.csv, "data/mon_stat_gen.csv")
.defer(d3.csv, "data/type_Gen.csv")
.await(LoadData);

function LoadData(error, map_data, year_data, month_data, type_data) {
    // map_data.features.pop();
    DrawMap(map_data, year_data, month_data, type_data);
    // console.log(map_data)
    let state = {};
    state['code'] = 'US-TOTAL';
    state['name'] = 'United States';
    DrawBar(state, month_data);
    DrawPie(state, type_data);
}

function updatePage(state, month_data, type_data) {
    d3.select('#bar').select('svg').remove;
    DrawBar(state, month_data);

    d3.select('#pie').select('svg').remove;
    DrawBar(state, type_data);
}

