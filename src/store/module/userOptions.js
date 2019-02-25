const state = {
  locations: ["日本", "バンコク", "アメリカ", "オーストラリア"],
  nomadStatus: [
    {
      value: "nomad",
      displayValue: "ノマド達成済み"
    },
    {
      value: "goingNomad",
      displayValue: "目指している"
    },
    {
      value: "notNomad",
      displayValue: "ノマドではない"
    }
  ],
  smoking: [
    {
      value: true,
      displayValue: "吸う"
    },
    {
      value: false,
      displayValue: "吸わない"
    }
  ],
  drink: [
    {
      value: true,
      displayValue: "飲む"
    },
    {
      value: false,
      displayValue: "飲まない"
    }
  ]
};

export default {
  namespaced: true,
  state
};
