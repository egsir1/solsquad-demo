/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/survey_app_program.json`.
 */
export type SurveyAppProgram = {
  "address": "DaCvrrNqNu2SA5Jx9R7Jverp9FxtSzezCg3eu4H2aWGn",
  "metadata": {
    "name": "surveyAppProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "registerParticipation",
      "discriminator": [
        184,
        98,
        113,
        182,
        173,
        52,
        218,
        209
      ],
      "accounts": [
        {
          "name": "participation",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  112,
                  97,
                  114,
                  116,
                  105,
                  99,
                  105,
                  112,
                  97,
                  116,
                  105,
                  111,
                  110
                ]
              },
              {
                "kind": "account",
                "path": "survey"
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "survey",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "surveyAuthority",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ipfnCid",
          "type": "string"
        }
      ]
    },
    {
      "name": "registerSurvey",
      "discriminator": [
        19,
        3,
        84,
        30,
        171,
        101,
        227,
        250
      ],
      "accounts": [
        {
          "name": "survey",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  115,
                  117,
                  114,
                  118,
                  101,
                  121
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ipfnCid",
          "type": "string"
        },
        {
          "name": "surveyType",
          "type": "string"
        },
        {
          "name": "rewardAmount",
          "type": "u64"
        }
      ]
    },
    {
      "name": "registerUser",
      "discriminator": [
        2,
        241,
        150,
        223,
        99,
        214,
        116,
        97
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  117,
                  115,
                  101,
                  114
                ]
              },
              {
                "kind": "account",
                "path": "signer"
              }
            ]
          }
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ipfnCid",
          "type": "string"
        }
      ]
    },
    {
      "name": "updateUser",
      "discriminator": [
        9,
        2,
        160,
        169,
        118,
        12,
        207,
        84
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true
        },
        {
          "name": "signer",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "ipfnCid",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "participation",
      "discriminator": [
        237,
        154,
        142,
        46,
        143,
        63,
        189,
        18
      ]
    },
    {
      "name": "survey",
      "discriminator": [
        146,
        73,
        17,
        4,
        6,
        233,
        167,
        141
      ]
    },
    {
      "name": "user",
      "discriminator": [
        159,
        117,
        95,
        227,
        239,
        151,
        58,
        236
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "insufficientFunds",
      "msg": "Insufficient funds to pay reward"
    },
    {
      "code": 6001,
      "name": "invalidRewardAmount",
      "msg": "Reward amount must be 0 for FREE surveys"
    }
  ],
  "types": [
    {
      "name": "participation",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "survey",
            "type": "pubkey"
          },
          {
            "name": "ipfnCid",
            "type": "string"
          },
          {
            "name": "rewardPaid",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "survey",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "ipfnCid",
            "type": "string"
          },
          {
            "name": "surveyType",
            "type": "string"
          },
          {
            "name": "rewardAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "user",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "wallet",
            "type": "pubkey"
          },
          {
            "name": "ipfnCid",
            "type": "string"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
