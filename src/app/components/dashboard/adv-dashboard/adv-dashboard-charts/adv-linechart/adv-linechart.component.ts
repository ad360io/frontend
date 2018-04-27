import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard-services/dashboard.service';
import { AdvertiserCharts } from '../../../../../models/advertiser-charts.model';
import { TrackCurrency } from '../../../../../services/trackCurrency.service';


@Component({
  selector: 'app-adv-linechart',
  templateUrl: './adv-linechart.component.html',
  styleUrls: ['./adv-linechart.component.css']
})


export class AdvLinechartComponent implements OnInit {

  chosenChart: any = 'impressionsChart';
  chartData: any;
  isLoaded: boolean = false;

  // Data initiailization for advertiser charts in EQC.
  impressionsDataEqc1: number [] = [4276,5716,3925,2934,5306,4596,5079,3232,4350,5182,5848,4092,2339,3720,3451,2434,4714,3038,4887,4697,5017,3117,5901,2552,3723,2917,5726,5732,2928,2272,4365,2326,2414,2667,4601,2563,2791,2235,3011,4812,4204,4164,2343,3975,2577,2314,4783,5663,3949,5670,3045,5391,5851,5597,5184,4777,4214,5302,3468,4105,2381,2589,2414,3453,4721,3075,3763,3437,3315,4279,4582,5170,4075,2984,4620,3034,3045,5112,4894,5604,5894,4474,4897,5924,2355,2906,3703,5035,2117,5772,5557,4092,2400,5807,5058,3749,4588,2312,4953,2359,4967,3740,3825,3396,5150,2524,4144,4085,5674,4708,2558,5508,2962,4478,3245,5546,4327,5782,4893,5012,3005,3037,2180,3199,5464,4444,2981,2598,2485,4032,3356,2807,5523,3699,3479,2963,2437,5631,3381,2253,2180,3670,2408,3767,5800,5205,5678,2378,2314,5557,2842,2923,3691,5165,4669,3685,4351,2089,5602,2848,5840,5396,2436,4268,2194,2397,4240,2792,4884,4971,4900,3537,3931,4034,3573,3762,2266,2667,3461,2466,4004,5950,4470,2018,5074,2024,3661,4412,2375,5278,3872,4388,3280,4293,3230,5099,2567,4193,3305,3547,2223,3129,2376,5723,5331,3546,4819,5526,3147,5128,3424,5537,2664,3212,5004,2852,2826,4545,5827,3306,2176,5518,3206,4740,4544,3608,3079,3938,2428,3173,4011,5812,4197,3236,3945,3791,2849,3618,5972,5651,5632,4972,5797,3171,5137,4326,5516,3162,5779,5027];


  impressionsDataEqc2: number [] = [5998,5363,5081,2203,4380,5612,2026,3799,5938,2969,5837,2134,2159,4036,5891,2639,3913,3132,3980,4934,2683,4426,4284,5805,2849,2591,4252,5900,2038,2759,4764,2748,2708,5774,3180,2958,2002,3681,2988,5275,3173,5745,3636,3899,2372,3468,2220,2991,2366,2547,2423,4019,5853,3363,3884,2908,3321,2199,4135,2483,4459,2926,4095,2205,3855,5684,2272,5143,5489,3671,3132,4646,2885,2137,4657,5067,2364,2413,3455,2071,4504,4193,4011,5767,4223,4334,2622,5486,2071,4569,5366,5695,5738,2442,2311,5034,2193,3569,2147,5645,4774,4418,4190,2534,3695,5129,2581,2928,4110,4091,3348,5508,4223,4785,2398,2190,3904,5239,3726,4157,2157,2477,5280,2674,2476,2317,2071,4423,3884,4778,4131,5053,5576,3372,5735,2811,4333,5518,3874,5406,4913,4881,2786,4988,2630,4580,3609,5831,5601,4825,3137,2581,5207,2456,3172,5362,3043,4387,5170,3927,4469,3338,2176,3166,5883,3811,3055,3831,3625,2665,2107,5965,5445,2671,4408,3680,3888,5400,2357,4554,3440,5475,2817,3137,3496,4083,5718,5514,2461,4695,3710,3626,5925,3277,2261,3248,5038,3557,5361,2520,4079,4942,2847,3425,3814,4442,3052,5240,5985,5430,5827,3496,5709,5210,2377,2980,4816,3575,5190,4394,5753,2351,3427,5844,4068,3305,2143,4836,5627,3775,4760,2968,5019,3699,5260,5589,2908,4230,4236,4039,5124,3919,3942,3371,2283,5805,2548,3536,4706,4839];

  impressionsDataEqc3: number [] = [2927,5002,3232,2605,4119,4668,4015,4050,5421,3989,5097,5322,2581,3149,2498,5729,3214,4838,4267,3917,3276,4194,2586,2621,3615,5758,3831,2584,2584,3537,5228,5278,5126,3004,5937,3173,3334,3086,3040,4981,3255,5668,3098,2069,2115,2422,4507,4634,5806,4592,3670,5219,2433,2988,5379,4500,2952,4213,5721,5743,4858,4400,4054,3205,2261,3927,2666,3933,3951,2392,2716,2186,3375,2003,2739,5921,3543,3172,4081,5962,5095,2847,5711,4985,3954,5086,4123,4863,2586,2420,2356,2648,5363,4577,2141,4331,4036,3954,3775,5489,4803,5690,3259,2410,4378,3175,5541,5913,2392,2813,3545,3211,5064,3953,4239,2113,4996,5157,3274,5215,4233,5079,4096,4793,3344,2032,3069,3070,3210,2835,3267,4054,5744,4418,2927,3812,4476,4511,2533,5284,4304,4903,5190,4276,4157,5703,5926,2867,2404,4460,2969,4424,5907,4077,4857,2902,5120,3567,2395,4321,2159,4772,3118,3334,2850,2384,3431,5563,4906,5223,2797,2757,4315,2510,3550,5217,4380,3412,3525,4949,5337,3846,5926,3848,3958,5918,3684,5710,2124,4803,2916,4674,3601,5471,4981,2623,2907,4650,4788,2430,2502,4817,2174,3815,3646,5585,2720,4881,5519,2582,4929,2546,5510,5101,2285,2867,4536,4644,2429,2594,2734,5075,3842,4577,2302,5148,5223,4676,4823,3151,5071,2591,4333,2602,3302,2733,2087,2738,2153,2256,2996,5496,4674,4593,4822,4177,5190,5324,5234,3042];

  impressionsDataEqc4: number [] = [2468,4899,4957,5900,3993,3676,5760,3305,2240,4003,5942,4933,4247,5817,3678,4371,3558,3418,2628,2343,4959,2534,4888,5342,2163,4972,4525,5600,5507,4138,4591,4603,2032,5692,5979,5821,4795,5286,2859,5719,3518,5545,2776,5000,3555,2113,5380,4714,3630,4966,3466,2033,2262,2263,4770,4339,2605,4143,2138,4500,4515,5973,4947,3208,4159,4324,2770,2287,4370,5963,5729,5466,4134,4754,3746,3329,3144,5010,2538,5990,3032,2192,3638,4693,5746,5197,2866,5167,3892,2596,2477,2804,3011,4912,3665,3561,4452,2727,5585,2758,5341,2956,5111,4548,3977,5728,2136,4211,4375,4888,2283,4327,4808,4348,2381,3262,4805,4458,2032,4895,4896,5806,2668,4744,2300,2344,4402,2608,3504,3593,5288,3219,4841,4903,4913,5834,2561,2691,3608,3083,4662,5957,3337,2622,2747,4163,5177,2367,3156,3813,3425,3742,5842,4442,5535,4714,4525,5051,5739,5100,4459,2662,4764,4688,3135,2772,5083,5121,5266,5077,4328,2365,5913,3105,4459,4468,3989,2584,2849,4218,2028,2878,2960,4878,5254,3138,2205,4985,5613,4439,4203,3358,5287,2475,3018,5775,3773,3729,3383,5535,5432,3191,3865,4970,5378,5646,2600,5373,3372,2115,3212,3410,3783,5410,3407,3275,4681,2051,4803,2092,2615,3091,4186,2027,3374,3148,2166,4510,5584,5226,4012,5734,3764,4936,3167,4542,4004,2412,4853,4933,5917,5544,4431,5761,3280,2673,4168,2762,4709,3260];

  impressionsDataEqc5: number [] = [3030,4694,5697,5244,5952,4616,4127,4466,3926,3508,5124,3271,4130,2766,3963,5555,2839,4498,5596,3268,4865,4807,5424,5407,5319,4196,4904,5109,5563,3333,4647,5252,4171,5361,5603,5065,5342,4966,3186,3987,2014,5398,4192,3261,5756,2407,3257,4353,4990,3149,4279,3002,4621,3699,5886,2445,5454,3307,2543,5556,5046,3830,5043,3827,4510,2425,2594,3220,2441,2812,3110,4012,5939,5493,4615,4488,4393,4685,3127,5548,4037,5812,5011,2207,4406,3362,5124,4214,4408,3452,5240,2432,2033,2044,2120,2816,3104,5321,4467,2011,5945,3887,5724,2983,5369,4482,5603,3142,4752,3112,5311,2161,3083,5972,2804,4305,2379,2583,2792,5840,3172,4672,5233,3782,4016,4185,5762,5548,5049,2706,5954,3148,4888,3062,3459,5957,2015,3429,4793,4334,4192,2431,5930,2656,2511,3493,5711,2966,5016,4266,3192,2962,2898,5759,2615,3920,2007,4803,4070,5458,3553,2171,3399,2762,5164,3055,2949,3514,3772,4263,4481,5908,4808,3622,2225,4109,3622,2461,4279,5824,4982,4618,3306,2269,2847,5037,3963,2780,3590,5689,4876,5836,3581,2902,3432,5625,2671,2235,2372,5699,3584,3818,3024,3927,5827,5474,4248,5185,5189,4234,2048,5080,4660,3770,2166,2572,3612,3843,5446,5555,4064,3747,5706,2960,5158,3022,3183,5844,5814,5224,4464,4886,3674,4055,4362,2184,3302,3230,2218,3925,2468,4667,5634,2445,5365,5602,5342,2526,5257,4609];


  clicksDataEqc1: number [] = [5056,5427,6338,6415,5211,6268,6098,5177,6176,6536,5578,5962,6647,6332,6247,6864,5408,6218,5849,5231,6380,6856,5410,6024,6256,5789,6492,5369,5518,6343,5431,6609,6652,5023,6712,5186,6813,5580,5379,6209,6337,5302,6909,5145,6257,5142,5977,6277,5157,5559,6155,5889,5147,6217,6101,6519,6650,5095,6012,6345,5296,5823,6262,5997,6763,5423,5956,6915,5134,5394,6111,5991,6946,5521,6647,5740,6976,5097,5595,5862,6349,5545,6125,6441,5713,5165,6740,5023,6390,6811,5283,6362,5849,6488,5002,6188,5673,6281,5482,6047,5445,6276,5587,6186,6087,6611,6852,5996,5574,6506,5708,5997,6785,5396,6568,6631,5892,6330,6379,5946,6550,5801,5008,6492,6154,6229,5477,5909,6217,5995,6148,5303,6497,5804,5367,6595,6456,6038,6524,6520,5171,6479,6954,5547,5954,5424,5466,6587,5297,6124,6137,6241,5342,6333,6554,5435,6010,6620,6497,6874,6014,5532,5911,6485,6746,5439,5575,6040,5906,6369,5475,6419,6745,6152,6325,5699,5117,6728,5368,6851,6343,6226,6552,6925,5612,6925,5291,5949,6720,5525,6946,6183,6802,5727,6729,5686,6901,6251,5611,6603,6679,5227,6548,6049,6919,6553,5921,6759,6451,6634,5653,5051,5680,6450,5755,5793,6606,6166,5426,5852,5700,5085,5945,5407,6770,5505,5076,5306,5969,5390,6624,5096,6514,5736,6581,5849,5184,5811,6871,6460,5941,6129,5475,6537,5866,6940,5271,5283,6380,5104];

  clicksDataEqc2: number [] = [6824,6256,6139,6034,5367,6515,5579,6529,5404,6034,6145,6044,5923,6403,6389,6295,6973,5426,6722,6797,6352,6621,6713,5047,6038,5209,5842,5265,6151,6186,6257,6816,6918,6376,6197,5847,5945,6489,6660,6908,5917,6168,5210,6740,6576,5581,6158,5353,5516,5114,5297,5667,5934,6898,5046,6879,6262,6511,6816,5901,6169,5791,5411,6678,5451,5110,5570,5187,5812,5136,6685,5123,6127,6704,6650,6243,6125,5241,5909,5412,6717,5130,5204,5237,5734,6031,6752,5670,5483,5303,5649,6674,6260,6668,5815,6825,6377,5812,6022,6304,5128,5900,6805,5151,6416,6751,5742,5908,6609,5936,5636,6454,6846,6709,5350,6111,5828,6350,5453,5353,6593,6988,6418,6769,5415,6955,6691,5716,5455,5980,5638,5297,6904,5751,6786,5648,5583,5192,6575,6823,5190,6439,5001,6465,5948,6489,5030,6505,5671,5610,6350,5918,5235,5513,6788,5723,5808,6727,5317,6956,5957,6639,5394,5425,5430,5365,5918,5001,6200,6460,5578,5138,6958,5448,5562,6467,6113,6066,6926,6468,6369,6898,5462,5879,5525,6814,6006,6536,5713,6026,5100,5701,5486,6142,6825,5963,5736,5695,5521,5315,6735,6067,5993,5810,5555,6032,6867,6609,5704,5202,5635,6996,6024,5256,6910,5807,6777,6848,5769,6508,6428,6426,6590,6401,6007,5773,6454,6545,5133,5301,6531,5707,6837,6923,6937,6918,6547,6263,6567,5136,6719,5465,5443,5441,5584,5379,6054,6188,5329,5947];

  clicksDataEqc3: number [] = [6300,6277,6086,5094,6993,5492,5434,6344,5691,6450,6782,5804,5439,6300,6039,6289,6893,5684,5152,5948,6605,6254,5156,6078,5937,6974,6894,6384,6038,6836,6762,5650,5092,5564,5361,5038,5821,6572,5538,5251,6417,5679,6164,5087,5315,5794,5728,6169,5472,6614,5595,6353,6615,6588,5722,6535,6735,5560,6522,6942,5257,5664,6182,6624,6473,6458,6900,5264,6082,6509,6364,6016,5688,5918,5343,5955,5768,5857,6151,6047,5318,5022,6648,6682,6068,6039,6858,5121,6180,6834,5444,6426,5738,6521,5843,5433,5042,6841,6724,6574,5656,5552,6372,5293,6625,5450,5326,5089,6523,5779,6480,5722,6623,5535,6051,5892,6563,6343,5261,6219,5073,6900,6154,6815,6434,6414,5488,5644,5589,5512,6951,6514,5325,6231,5841,5528,5231,5260,6358,6429,5108,5566,6221,6037,6069,6156,6554,6685,5066,6049,6557,6481,5372,5275,6812,5250,6806,5577,6737,6691,5818,5595,6391,6983,5733,5762,5932,5314,6735,6926,6931,5840,5633,5781,5710,6495,5413,6125,5852,5828,5130,5625,6114,6691,5435,6649,5966,6522,5314,6978,5169,5579,6675,5875,5180,5286,6513,5401,5387,6804,5672,5302,5743,5049,5064,6125,5049,6886,6451,6777,6599,5710,6372,5030,6735,5222,6650,6402,5363,6594,6757,6376,6982,5886,6865,6863,5767,6408,5705,5083,6838,6009,6050,6423,5488,6380,5759,6195,5082,6286,6871,5244,6617,5047,6904,5696,6068,6896,5567,6412];

  clicksDataEqc4: number [] = [6012,6390,6961,5714,5845,6322,6717,5615,6295,5288,6977,6078,5681,5534,5404,5352,5847,5838,6609,5218,5570,5038,6769,6719,5249,6680,5165,5373,6935,5171,5852,6184,5876,6963,5610,5509,6592,5049,5992,6687,6243,6289,6165,6478,6069,5284,6761,5551,5748,5737,6468,5542,5092,6968,6950,5942,5911,5010,6674,6078,5959,6417,6144,6427,5865,6380,5775,5781,5757,6156,6692,6092,6987,6022,5966,5198,6797,5387,5434,5900,6431,5654,5405,5274,6786,6612,6997,6119,6721,5877,5019,5532,6682,6563,5138,5649,6863,5072,5381,6437,6647,6135,5134,6341,5001,5235,6225,6925,6276,6036,5510,5418,6243,6369,5779,6560,6423,5034,5703,5083,5158,6943,5915,6584,5427,5774,6580,6288,6394,6637,5203,5756,5817,6259,6148,5287,5276,6031,5598,5977,6229,6387,5796,6795,5990,6066,5191,6083,6712,5298,5050,6643,5677,5049,5099,5133,6618,6886,6159,5843,6939,5944,5521,5005,5472,6477,5551,6260,6955,6585,6692,6864,5950,5384,6459,5330,6457,6392,5872,6515,5631,5437,6257,5845,5703,6320,5994,5820,6239,5421,6720,6234,6340,6116,6263,5296,6041,5109,6547,5279,5065,6056,5087,6201,5963,5516,5541,6080,6348,6778,6695,6400,6432,5676,6810,5770,6820,5161,6644,5023,6740,6994,6437,6204,6126,6332,6338,5354,6406,6417,5085,6461,6122,5702,6112,6746,6604,5529,5917,5274,6447,6161,5882,6204,5194,6398,6691,5292,5828,6292];

  clicksDataEqc5: number [] = [6589,5555,5665,6572,6585,6616,5368,6576,5040,5089,5797,6250,6889,6220,5017,5594,5506,6166,5668,6839,5965,6918,6447,6298,5154,5927,6119,5919,6951,5107,5297,5057,5757,6771,6060,5728,6427,6822,6844,6512,5320,6076,6764,5925,6965,5655,5575,5498,6534,6445,5178,6593,6008,5345,6086,6748,6541,5243,5396,5106,5524,6192,5427,6865,5354,6094,5236,6378,6667,6866,5963,6629,5320,6851,5413,5820,6308,5531,6652,6520,6704,5621,5626,6208,6045,6375,5160,5634,6663,5175,5063,6379,6365,6178,6000,5255,6620,5514,6218,6308,5815,6684,6724,6565,5803,5992,5581,6597,5704,6119,6737,5102,5066,6678,5155,6853,5871,5174,5176,6591,6740,5002,5942,5199,5383,6353,6337,6006,6673,5147,6090,5596,6495,6470,5609,5171,5867,6401,6399,6902,5464,6139,6880,5842,5513,6371,5547,6236,5552,6155,5962,5994,5553,6413,5382,6888,6210,5959,5894,5234,5978,5830,6499,6878,6883,5210,6372,6927,6101,5668,6883,6179,5470,6655,5193,6887,6735,6132,6766,5357,5799,5051,5711,5909,6618,6621,6108,6943,5277,6579,5316,5473,6827,6262,6304,5686,5081,5223,5455,5690,5485,6587,5908,5685,5407,6928,5822,5402,6854,5909,6248,6782,6602,6850,5998,5703,5333,5515,5504,5324,6542,6257,6086,6296,5699,5507,6315,6719,5273,5123,5935,6445,5984,6787,6282,5239,5457,5350,6280,6482,6495,6663,6826,6553,5496,6549,6509,5390,5735,5526];

  // Data initiailization for advertiser charts in XQC.

  impressionsDataXqc1: number [] = [5094,4556,3266,4183,5936,3355,3431,4181,4017,3670,4640,2119,3261,4354,2253,5856,3225,2899,5372,5120,5770,3900,2519,4672,3577,4599,2391,2577,2018,5478,5196,5391,3752,2621,3410,3032,5722,2192,5158,3565,2420,4907,4868,5410,4976,3124,4446,3245,4961,2704,5674,5979,4108,4251,4432,2122,2016,2863,5313,3196,2505,2405,4044,3788,4979,3466,4771,5879,2186,4220,3575,3529,5197,4418,5857,4116,3586,4465,2058,2375,3768,2786,3210,2519,3037,5245,5992,3221,5512,3594,5414,2668,4243,5653,3013,4640,2646,2088,5510,2046,4638,3904,4350,2193,4920,4113,3192,3888,3736,2787,3711,4699,5285,5575,3229,3411,3763,2394,5902,5120,2484,5506,5495,4514,3800,5759,3616,3935,3041,4910,2859,3701,4376,5882,5836,2398,5567,4543,2075,3384,3329,2813,4348,3965,3689,3002,3391,5293,5432,5760,3061,2236,4623,5415,2336,3961,5539,4423,3222,3844,5161,3705,4599,5502,3938,4097,5617,5273,2342,2518,3389,4949,2944,2303,2863,4163,2112,4216,4984,5056,4376,2810,4676,2781,3472,5933,5844,2705,5836,3444,4254,4668,2583,3220,5124,5857,5880,4024,2859,3734,5001,4503,5133,2730,5633,4944,5179,4964,2533,2662,4734,2101,3258,3787,3939,5754,4876,5632,4036,4100,3008,4578,3113,5924,3251,4783,4112,4496,2228,4046,5702,5791,5451,3784,5802,5461,2631,3209,2559,4972,3483,3050,5164,5888,3731,2706,2457,3301,2534,2915];

  impressionsDataXqc2: number [] = [2243,4332,5822,5579,2836,5319,3299,5627,2419,3810,2888,2692,5470,4260,3872,3618,5650,4740,2157,3588,4798,5061,2869,5266,3850,3742,5020,4368,2882,3459,2571,3028,5187,5205,5151,3696,5810,2482,5919,3905,5811,4651,2712,5506,4657,2172,2789,4561,4806,3345,2120,2385,2225,2732,5885,3604,4396,5587,5247,2129,5935,4401,3350,5760,3671,2771,5728,4837,4864,3442,2870,3281,3458,4104,5809,2905,2165,4367,2564,4068,4549,4907,5496,2436,3334,4884,5316,2066,3247,4194,2074,4002,2076,2318,2888,3278,3287,2486,4881,4116,4482,3468,4317,2126,3855,2009,3223,2402,3689,5224,3964,4507,5659,4356,4452,3243,5766,4888,4973,3966,4619,5036,2084,2019,3909,4484,5928,2590,5864,2616,2285,3750,2267,4354,5804,3363,4444,5610,3843,5461,4167,3983,3336,5070,2169,4428,2229,5587,4537,2849,2408,5880,3881,4249,4088,3841,2638,2314,5710,3135,5687,2245,3948,4316,4839,2932,2585,5404,3495,5838,2848,4765,5766,5248,3247,4910,4563,5963,5031,4932,2802,3276,3098,2090,5854,5497,2350,3019,4056,2110,5063,5856,5117,5481,4637,4683,5407,2794,4345,3731,5248,4749,5954,3284,5760,5019,2355,2426,2048,5126,2588,3707,5629,3729,4342,4773,5935,3209,4031,2454,3260,5217,5390,3586,3978,4765,5353,2823,2735,3282,3570,4108,4774,5163,2702,5016,2511,4653,2840,5425,4008,2261,3848,2066,2632,5348,3150,3283,5983,3487];

  impressionsDataXqc3: number [] = [3276,2584,3792,3134,5573,2807,5938,3445,2309,2410,2255,4159,5290,4638,4417,2934,2613,4870,5375,2222,3894,3232,3835,3922,2151,2201,4483,5391,4933,5133,2795,4316,2819,3062,2046,4859,5942,5309,3956,5354,3769,3304,3552,4201,3957,2482,5181,5793,2274,2707,5389,3515,3184,2466,2147,4213,5302,4525,3750,5150,4340,3012,2427,3499,4572,5297,4764,4236,3745,4586,2373,3527,4636,3839,2378,2736,5473,4723,5465,2701,4864,4915,5227,4088,3690,2740,4629,5441,2601,2208,3717,5537,3845,3758,4359,4039,5354,2190,3847,5321,5738,3534,3080,3843,5037,5153,5030,5507,4963,5306,2044,3301,4849,2485,3037,4886,4448,4243,4327,5003,2319,3143,5446,4012,4596,4754,2533,3897,5508,3651,5673,4513,4931,4807,4143,2247,2419,3846,2710,4447,3817,2711,2318,2880,2502,4981,3615,5502,2252,4970,5206,4254,2718,5856,3412,2948,5361,4479,3652,2016,5020,5691,5473,4762,2036,4479,3072,2793,4212,5903,4262,5714,4077,5490,3000,3136,5467,2235,5263,3946,3552,4330,4373,5022,5390,2713,2633,3234,5423,2110,4629,5548,3481,4787,4060,3390,5146,3974,3785,2063,4252,2257,5248,4066,2214,2750,4081,3138,5313,3058,4028,4599,3734,2212,4468,3120,4467,4092,2761,5592,5604,5622,3938,4016,4936,5600,5745,2085,5220,3678,3697,2835,3865,2886,4060,4399,3788,5461,4816,2898,2827,5535,4909,3838,2340,3275,4121,4167,3056,5773];

  impressionsDataXqc4: number [] = [3095,5655,5627,3721,2834,3345,3191,3339,2353,5777,4133,2958,2073,2276,5671,4030,2089,3144,4781,5250,5275,3349,2119,4121,4751,2743,2809,2126,5564,3406,4366,5579,5016,4070,3504,2447,4631,5351,2290,3230,5401,3585,5439,4189,3944,5199,5698,5424,3340,2175,2978,3492,5651,3007,4845,4190,4138,3510,3126,2512,3552,4307,2808,4985,5157,2699,5977,3406,2945,2628,4376,2597,3248,2916,2381,2619,5160,4525,5921,3922,4122,5497,5414,4910,4023,2220,3830,5866,5898,2775,2369,5753,3977,3659,5066,3560,4719,4586,2173,2621,5944,4405,3121,3884,3635,4261,2127,4441,5100,2550,4069,2112,4560,2654,3996,2733,4178,3034,4934,4298,4296,3965,5125,3011,5517,2877,4825,5669,5867,4162,4499,4583,5309,5712,3584,2353,3071,2834,4961,4205,3465,4246,4347,4532,4882,2250,5750,2895,5377,3530,5087,2644,4484,4984,2198,3190,2396,4936,5090,5637,2887,4380,3360,2142,5384,4750,5752,4743,5200,5788,4477,4805,4894,2813,3860,4711,3837,3308,5975,2849,5399,4197,5604,2027,4542,4978,3870,3983,3292,5609,3539,4558,5907,3293,5059,4310,4698,3104,4803,5566,5548,3168,3166,3279,3697,4412,4348,2486,4667,2527,3511,4696,2012,4476,2206,2209,4859,3545,5743,2720,3443,3250,2596,4821,3633,2221,3000,2947,4579,2062,5182,4297,5339,5366,2284,5284,3738,2293,3065,4676,2243,3058,2155,5148,3872,5553,4248,3153,2890,5803];

  impressionsDataXqc5: number [] = [4324,2187,3866,5867,3946,5030,5739,3468,2867,3557,5695,2941,4234,5670,5236,3669,5008,5944,2862,5433,4799,2858,5257,4940,3286,3768,5598,5043,4663,4864,5319,4930,2566,4134,3787,3732,2910,5977,4508,5642,5897,4668,3308,2831,2275,4219,3705,4006,4398,5779,5244,5920,4604,5036,5163,5172,2850,2675,3022,2459,5761,5717,4234,5393,5855,2189,4527,5138,3477,2108,4633,2986,3644,5332,2321,5788,3077,4267,5893,5249,5226,3571,2709,4600,5345,3904,4537,4580,2114,3016,4471,3055,3506,3587,4304,4440,5218,2298,4027,4230,4641,4812,2003,5626,4266,4182,2199,4875,3971,2866,2858,2259,3272,5542,4158,2904,5629,4240,4330,3782,5237,2048,5268,2921,2583,5257,3603,5958,3969,2536,4746,4754,3275,2045,3847,3859,4090,5164,5864,3737,2500,3817,5229,4718,5508,4821,5241,5748,2964,4486,5017,2912,5186,4532,3830,4637,5923,4180,5083,3634,5379,2840,4239,3435,4096,4362,2688,5081,3810,5328,5517,4052,4461,4808,2072,5809,2148,5418,2039,5290,5825,2436,3437,5528,2300,2812,3273,3423,2953,5770,3023,3039,2049,4054,2660,5463,4840,2767,5579,2809,3152,2906,5397,4547,2633,4275,3858,3805,5732,5843,3023,3142,5873,2628,4323,4989,2745,3260,3778,5813,3588,2442,2735,2817,2265,4865,5729,5537,3506,2674,4843,3828,2741,2666,5355,4818,3825,3167,3879,3029,5650,3647,2072,3121,4601,2608,5495,3333,2320,3196];

  clicksDataXqc1: number [] = [6736,6744,6736,5825,6281,5343,5722,5816,6230,6983,6060,6058,6547,6825,6910,6161,6103,6950,5314,5708,5586,5241,5265,5068,5332,5557,6697,6609,5016,6815,5786,6121,5877,5116,6843,6053,5195,5822,5240,5212,5286,5581,5724,5725,6119,6314,6437,5231,6700,5230,5676,6190,5636,6024,5154,6361,6410,5582,6810,5715,5030,6996,6151,6234,6099,5438,6029,5385,6658,5993,6806,5876,5650,6514,5088,6047,6977,6700,5373,6780,5416,6963,6989,6028,5686,6851,6678,5619,6601,6651,5458,5778,5617,6089,6651,6129,5175,6504,6834,6559,6330,5301,5906,5655,6281,5128,5384,6893,6237,5710,5344,5632,5577,5803,6762,5877,6702,5775,5909,6900,6769,5064,5657,5685,5614,6413,6506,5996,6736,5629,5546,5930,6670,5908,6307,5302,5018,5099,5584,5903,6329,6837,6531,6972,5099,6379,5398,5360,6421,5283,5482,5784,6901,5848,5051,6015,5720,5129,6604,6710,5345,6319,6218,5076,6304,6692,5690,5787,5849,6654,6808,5070,5904,6283,6787,6258,6656,6751,6727,6037,5080,5035,5318,6423,5854,5757,6228,5167,6176,6542,5288,6115,6637,6952,5834,6694,5755,6450,6092,6669,5931,6195,6050,6287,5517,6445,6809,5260,5722,5404,5925,5954,5612,5742,6854,6275,6287,5587,5502,5393,5839,6719,5892,5911,6316,5567,6705,5097,5260,6406,6477,6932,5321,5748,5890,5703,6135,6660,5322,6846,5303,6682,6735,5840,6678,5708,6133,6364,6463,5265];

  clicksDataXqc2: number [] = [6413,5031,5439,6776,5463,6123,5092,6142,5149,6950,5621,5351,6733,5605,6965,5880,5944,5047,6170,5372,5740,5587,5510,5256,6493,6218,5445,5958,5677,5858,5266,6670,5779,6112,6939,5375,6702,5852,5730,6091,5034,5177,5283,6507,5699,6020,6938,6942,6664,6038,6304,5891,6055,6167,5973,6210,6704,6457,6366,5800,5397,6689,6900,6821,6822,5553,5745,5534,5552,6665,5215,5362,6992,6653,5274,6395,5574,6735,5775,6360,6429,6892,5433,6866,6768,6226,5206,5823,5662,5115,5012,5774,6013,6178,6942,5580,6572,6276,6657,6002,6908,5214,6101,5296,6106,6469,6674,5992,5703,6971,5082,5268,6692,6944,5631,6418,6538,5882,5886,5032,6076,5364,5156,6691,5001,6817,6233,5978,5517,6918,6172,5659,6349,5911,5390,6111,6510,6666,6959,6152,6272,6100,5658,5612,5290,6267,6798,5802,6570,5532,5054,6065,5355,6164,6812,5145,5270,5039,5386,6679,6162,6883,5918,5022,6169,5061,6759,6065,5518,6655,5220,6815,5640,6434,5687,5173,5269,5286,5587,5480,6811,5969,6647,6782,6147,5025,6289,6010,5247,5806,6223,6731,6203,5968,6441,6618,5634,5771,6048,5501,5088,6105,5059,5037,6513,5780,6681,6437,6264,6240,6346,5585,5570,5827,5136,5919,5109,5481,6020,6873,5507,5283,5760,5984,5406,6349,5342,5247,5519,6468,5584,5436,6461,5792,5369,6203,6004,5635,5306,5057,6006,6791,6452,5503,5693,5640,5394,6719,6023,6490];

  clicksDataXqc3: number [] = [5905,6375,5204,6102,6951,5506,5204,6958,5027,6336,5741,5294,6216,6503,5917,6073,6859,5039,5624,5297,6428,5355,5960,6146,5706,6696,5452,5598,6295,6365,5584,5889,6452,5159,6871,5805,6695,6938,5457,6744,6587,6129,5876,6867,6514,6887,5963,5476,5687,5334,5409,6880,6434,6079,5896,6840,5042,5646,5818,5337,6227,6554,5673,6174,6864,5830,5280,5336,5291,5380,6229,6734,6055,5378,5391,6673,6038,6727,6000,6885,5206,6325,6931,5419,6790,5682,5079,6794,5267,6599,6587,5031,5478,5372,6585,6905,5533,5912,5008,6242,6711,6431,5979,5516,5712,5374,5707,5527,5529,6816,5018,5084,6113,6997,6505,5162,6392,5343,5575,6346,5733,5728,6569,5580,5140,6560,6365,6263,6143,6685,5776,6034,5341,5583,5955,5038,5429,5829,6735,6688,5034,6706,6933,5578,6358,6900,6298,6886,6468,6439,5836,6775,5669,5140,6509,5658,6126,6457,5269,6687,6709,5492,5629,5245,5301,5145,5502,5106,6962,5148,5301,6912,5541,6275,6512,5530,5614,6770,6308,6260,6489,6651,5363,6517,6713,5161,5747,6951,6196,5577,5428,6659,6403,5777,6404,5912,5075,5405,5648,5697,6801,5395,5606,5266,5549,5346,5270,6279,6745,5630,6835,6310,6126,5662,6558,6067,6067,6983,6031,5113,6797,5084,6441,6586,5984,6535,5484,6990,6049,5155,6209,5101,5233,5224,5161,6482,6814,5219,5038,6183,5867,5050,5119,5455,6040,6271,5780,5063,6906,5152];

  clicksDataXqc4: number [] = [5719,5043,6357,5779,5246,5340,6866,6431,5039,5150,5273,5434,5054,5751,5846,6367,5524,5697,6796,6722,5090,6710,6191,6162,5604,6948,5082,5315,6635,6721,5909,5183,6067,6770,5973,5143,5540,5676,5034,5823,5957,6817,6549,6544,6042,5082,6606,5538,5111,6802,6050,6467,5396,6200,6627,5976,6298,5407,5368,5655,6228,6750,6214,6349,5703,5638,6676,5226,6204,5676,5771,6513,6381,5002,5506,6142,6892,5729,6123,5637,5515,5327,5806,6962,6388,6003,5251,6689,5858,6404,5020,5652,5424,5781,6655,5695,5220,6615,6235,6533,6199,6036,5634,6426,6286,6536,6447,5564,6433,6080,5927,5929,6420,6753,6347,5800,5168,6858,6649,5425,6230,5894,5557,5596,5739,6952,5890,6734,5254,5856,5510,6369,6424,5538,5667,5568,6126,6060,6251,6652,5154,5232,5248,5356,5192,6783,6909,6060,5742,5904,6028,6280,5618,5320,6513,5539,5311,5980,5312,6401,6512,6275,5616,6162,5420,6769,6065,6989,5347,5109,6212,6856,6678,6863,5409,5213,5005,6096,5135,5405,6630,6618,6676,6880,5051,6010,5206,6064,6572,6879,6715,5272,5279,6375,5661,6537,6543,6413,6100,6547,6824,6176,6644,6151,6541,6028,5198,5242,6065,5609,6566,5757,6172,5543,5902,6493,6740,5192,5155,6435,5986,6766,6867,5224,5750,6150,5520,6705,6394,6909,5756,5904,5393,6755,6996,5082,5034,6101,5057,5161,6851,6418,6343,6357,5201,5287,6515,6810,6281,5273];

  clicksDataXqc5: number [] = [5719,5043,6357,5779,5246,5340,6866,6431,5039,5150,5273,5434,5054,5751,5846,6367,5524,5697,6796,6722,5090,6710,6191,6162,5604,6948,5082,5315,6635,6721,5909,5183,6067,6770,5973,5143,5540,5676,5034,5823,5957,6817,6549,6544,6042,5082,6606,5538,5111,6802,6050,6467,5396,6200,6627,5976,6298,5407,5368,5655,6228,6750,6214,6349,5703,5638,6676,5226,6204,5676,5771,6513,6381,5002,5506,6142,6892,5729,6123,5637,5515,5327,5806,6962,6388,6003,5251,6689,5858,6404,5020,5652,5424,5781,6655,5695,5220,6615,6235,6533,6199,6036,5634,6426,6286,6536,6447,5564,6433,6080,5927,5929,6420,6753,6347,5800,5168,6858,6649,5425,6230,5894,5557,5596,5739,6952,5890,6734,5254,5856,5510,6369,6424,5538,5667,5568,6126,6060,6251,6652,5154,5232,5248,5356,5192,6783,6909,6060,5742,5904,6028,6280,5618,5320,6513,5539,5311,5980,5312,6401,6512,6275,5616,6162,5420,6769,6065,6989,5347,5109,6212,6856,6678,6863,5409,5213,5005,6096,5135,5405,6630,6618,6676,6880,5051,6010,5206,6064,6572,6879,6715,5272,5279,6375,5661,6537,6543,6413,6100,6547,6824,6176,6644,6151,6541,6028,5198,5242,6065,5609,6566,5757,6172,5543,5902,6493,6740,5192,5155,6435,5986,6766,6867,5224,5750,6150,5520,6705,6394,6909,5756,5904,5393,6755,6996,5082,5034,6101,5057,5161,6851,6418,6343,6357,5201,5287,6515,6810,6281,5273];

  datasets = [{},{},{},{},{}]
  // Declarations for the Linechart attributes
  public lineChartOptions: any = {
    responsive: true
  };

  public lineChartColors: Array<any> = [
    { // red
      backgroundColor: 'rgba(255,155,5,0.5)',
      borderColor: 'rgba(255,155,5,1)',
      pointBackgroundColor: 'rgba(255,155,5,1)',
      pointBorderColor: 'rgba(255,155,5 ,1)',
      pointHoverBackgroundColor: '#00f',
      pointHoverBorderColor: 'rgba(255,161,181,0.8)'
    },
    // { // dark grey
    //   backgroundColor: 'rgba(255,255,255,0)',
    //   backgroundHoverColor: 'rgba(255,255,255,0)',
    //   borderColor: 'rgba(255,255,255,0)',
    //   pointBackgroundColor: 'rgba(255,255,255,0)',
    //   pointBorderColor: 'rgba(255,255,255,0)',
    //   pointHoverBackgroundColor: 'rbga(0,0,0,1)',
    //   pointHoverBorderColor: 'rgba(134,199,243,0.8)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(255,255,255,0)',
    //   borderColor: 'rgba(255,255,255,0)',
    //   pointBackgroundColor: 'rgba(255,255,255,0)',
    //   pointBorderColor: 'rgba(255,255,255,0)',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(255,226,154,0.8)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(255,255,255,0)',
    //   borderColor: 'rgba(255,255,255,0)',
    //   pointBackgroundColor: 'rgba(255,255,255,0)',
    //   pointBorderColor: 'rgba(255,255,255,0)',
    //   pointHoverBackgroundColor: 'rgba(255,255,255,0)',
    //   pointHoverBorderColor: 'rgba(241,242,244,0.8)'
    // },
    // { // grey
    //   backgroundColor: 'rgba(255,255,255,0)',
    //   borderColor: 'rgba(255,255,255,0)',
    //   pointBackgroundColor: 'rgba(255,255,255,0)',
    //   pointBorderColor: 'rgba(255,255,255,0)',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(147,217,217,0.8)'
    // }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  isImpressionsActive: boolean = true;
  isClicksActive: boolean = false;

  lineChartImpressionsEqcDataset: any;
  lineChartImpressionsXqcDataset: any;

  lineChartClicksEqcDataset: any;
  lineChartClicksXqcDataset: any;

  lineChartXAxisDates: any;

  currentDate : any;
  statisticsStartDate: any =  +new Date('2018, 2, 26');
  someDataset;
  //Declarations for creating names for ads.
  adNamesPool = ['Twitter Influencer','Trailer Spot','Blog Post','Sponsored Forum','Video Spot', 'Podcast Spot','Written Spot', 'Twitch Influencer','Instagram Influencer','Youtube Influencer','Facebook Influencer', 'Niconico Influencer']
  adNamesEqc: string[] = ['Name1','Name2','Name3','Name4','Name5'];
  adNamesXqc: string[] = ['Name1','Name2','Name3','Name4','Name5'];


  constructor(private dashboardService: DashboardService,
              private trackCurrency: TrackCurrency){

  }

  ngOnInit() {
    // Adding a prototype for calculation of a date array.
    this.currentDate = +new Date();
    this.calculateChartDatasets();
    this.isLoaded = true;
    this.someDataset = this.chooseDataset();
  }

  // Function that standardizes dates to UTC
  treatAsUTC(date) {
    let result = new Date(date);
    result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
    return +result;
  }

  // Function that finds the difference in days between two given dates.
  daysBetween(startDate, endDate) {
    var millisecondsPerDay = 24 * 60 * 60 * 1000;
    return ((this.treatAsUTC(endDate) - this.treatAsUTC(startDate)) / millisecondsPerDay);
  }

  // Function that finds that provides the date array between between two given dates.
  getDates(startDate, endDate) {
    let dates = [],
    currentDate = startDate,
    addDays = function(days) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + days);
                return date;
              };
    while (currentDate <= endDate) {
    dates.push(currentDate);
    currentDate = addDays.call(currentDate, 1);
    }
    console.log(typeof dates);
    return dates;
  }

  // Function that generates names for ads.
  generateAdNames() {
    for (let i = 0; i < this.adNamesEqc.length; i++) {
      this.adNamesEqc[i] = this.adNamesPool[Math.floor(Math.random() * this.adNamesPool.length)]+' No.'+(Math.floor(Math.random() * 15)).toString();
    }

    for (let i = 0; i < this.adNamesXqc.length; i++) {
      this.adNamesXqc[i] = this.adNamesPool[Math.floor(Math.random() * this.adNamesPool.length)]+' No.'+(Math.floor(Math.random() * 15)).toString();
    }

  }

  // Functions that portions the data to be used by the charts.
  calculateChartDatasets(){
    this.generateAdNames();
    let daysOffset = Math.floor(this.daysBetween(this.statisticsStartDate,this.currentDate));

    this.lineChartImpressionsEqcDataset = [
      {data: this.impressionsDataEqc1.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[0]},
      {data: this.impressionsDataEqc2.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[1]},
      {data: this.impressionsDataEqc3.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[2]},
      {data: this.impressionsDataEqc4.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[3]},
      {data: this.impressionsDataEqc5.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[4]},
    ];

    this.lineChartImpressionsXqcDataset = [
      {data: this.impressionsDataXqc1.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[0]},
      {data: this.impressionsDataXqc2.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[1]},
      {data: this.impressionsDataXqc3.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[2]},
      {data: this.impressionsDataXqc4.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[3]},
      {data: this.impressionsDataXqc5.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[4]},
    ];

    this.lineChartClicksEqcDataset = [
      {data: this.clicksDataEqc1.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[0]},
      {data: this.clicksDataEqc2.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[1]},
      {data: this.clicksDataEqc3.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[2]},
      {data: this.clicksDataEqc4.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[3]},
      {data: this.clicksDataEqc5.slice(daysOffset,30+daysOffset), label: this.adNamesEqc[4]},
    ];

    this.lineChartClicksXqcDataset = [
      {data: this.clicksDataXqc1.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[0]},
      {data: this.clicksDataXqc2.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[1]},
      {data: this.clicksDataXqc3.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[2]},
      {data: this.clicksDataXqc4.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[3]},
      {data: this.clicksDataXqc5.slice(daysOffset,30+daysOffset), label: this.adNamesXqc[4]},
    ];

    //Create X axis chartLabels
    let dayArray:any;
    let startDate: Date = new Date(new Date().setDate(new Date().getDate() - 30));
    let dates = this.getDates(startDate,this.currentDate);
    let weekDays: string[] = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let xAxis : any[] = [];
    for (let i = 0; i < dates.length; i++){
      xAxis[i] = new Date(dates[i]);
    }
    let dateList: any[] =[];
    for (let i = 0; i < xAxis.length -1; i++){
      dateList[i] = weekDays[xAxis[i].getDay()];
    }
    this.lineChartXAxisDates = dateList;
  }

  // Function that returns the right dataset based on the chosen currency and chart type.
  public chooseDataset(){
    if(this.trackCurrency.currency === 'EQC') {
      if(this.chosenChart == 'impressionsChart') {
          return this.lineChartImpressionsEqcDataset;
      }
      if(this.chosenChart == 'clicksChart') {
        return this.lineChartClicksEqcDataset;
      }
    }

    if(this.trackCurrency.currency === 'XQC') {
      if(this.chosenChart === 'impressionsChart') {
          return this.lineChartImpressionsXqcDataset;
      }
      if(this.chosenChart === 'clicksChart') {
        return this.lineChartClicksXqcDataset;
      }
    }
  }

  // Function that provides the labels for the charts.
  public chooseLabels() {
    if(this.trackCurrency.currency === 'EQC') {
      return this.adNamesEqc;
    }
    if(this.trackCurrency.currency === 'XQC') {
      return this.adNamesXqc;
    }
  }

  // Function that determines that chart that is currently active on the template.
  public activeChart(event:any)  {
    let target = event.target || event.srcElement || event.currentTarget;
    this.chosenChart = target.attributes.id.value;

    if (this.chosenChart === 'impressionsChart') {
      this.isImpressionsActive = true;
      this.isClicksActive = false;

      }
    if (this.chosenChart === 'clicksChart') {
      this.isImpressionsActive = false;
      this.isClicksActive = true;
      }
  }

  // Helper functions for the chart.
  public chartHovered(e:any):void {
    console.log(e);
  }

  // Helper functions for the chart.
  public chartClicked(e:any):void {
    console.log(e);
  }
}
