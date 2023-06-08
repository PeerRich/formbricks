import { z } from "zod";

export const ZSurveyThankYouCard = z.object({
  enabled: z.boolean(),
  headline: z.optional(z.string()),
  subheader: z.optional(z.string()),
});

export const ZSurveyChoice = z.object({
  id: z.string(),
  label: z.string(),
});

export const ZSurveyLogicCondition = z.union([
  z.literal("submitted"),
  z.literal("skipped"),
  z.literal("equals"),
  z.literal("notEquals"),
  z.literal("lessThan"),
  z.literal("lessEqual"),
  z.literal("greaterThan"),
  z.literal("greaterEqual"),
  z.literal("includesAll"),
  z.literal("includesOne"),
]);

export const ZSurveyLogicBase = z.object({
  condition: ZSurveyLogicCondition.optional(),
  value: z.union([z.number(), z.string(), z.array(z.string())]).optional(),
  destination: z.union([z.string(), z.literal("end")]).optional(),
});

export const ZSurveyOpenTextLogic = ZSurveyLogicBase.extend({
  condition: z.union([z.literal("submitted"), z.literal("skipped")]).optional(),
  value: z.undefined(),
});

export const ZSurveyMultipleChoiceSingleLogic = ZSurveyLogicBase.extend({
  condition: z
    .union([z.literal("submitted"), z.literal("skipped"), z.literal("equals"), z.literal("notEquals")])
    .optional(),
  value: z.string(),
});

export const ZSurveyMultipleChoiceMultiLogic = ZSurveyLogicBase.extend({
  condition: z
    .union([z.literal("submitted"), z.literal("skipped"), z.literal("includesAll"), z.literal("includesOne")])
    .optional(),
  value: z.array(z.string()),
});

export const ZSurveyNPSLogic = ZSurveyLogicBase.extend({
  condition: z
    .union([
      z.literal("submitted"),
      z.literal("skipped"),
      z.literal("lessThan"),
      z.literal("lessEqual"),
      z.literal("greaterThan"),
      z.literal("greaterEqual"),
      z.literal("equals"),
      z.literal("notEquals"),
    ])
    .optional(),
  value: z.number(),
});

const ZSurveyCTALogic = ZSurveyLogicBase.extend({
  condition: z.union([z.literal("submitted"), z.literal("skipped")]).optional(),
  value: z.undefined(),
});

const ZSurveyRatingLogic = ZSurveyLogicBase.extend({
  condition: z
    .union([
      z.literal("submitted"),
      z.literal("skipped"),
      z.literal("lessThan"),
      z.literal("lessEqual"),
      z.literal("greaterThan"),
      z.literal("greaterEqual"),
      z.literal("equals"),
      z.literal("notEquals"),
    ])
    .optional(),
  value: z.number(),
});

export const ZSurveyLogic = z.union([
  ZSurveyOpenTextLogic,
  ZSurveyMultipleChoiceSingleLogic,
  ZSurveyMultipleChoiceMultiLogic,
  ZSurveyNPSLogic,
  ZSurveyCTALogic,
  ZSurveyRatingLogic,
]);

const ZSurveyQuestionBase = z.object({
  id: z.string(),
  type: z.string(),
  headline: z.string(),
  subheader: z.string().optional(),
  required: z.boolean(),
  buttonLabel: z.string().optional(),
  logic: z.array(ZSurveyLogic).optional(),
});

export const ZSurveyOpenTextQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("openText"),
  placeholder: z.string().optional(),
});

export const ZSurveyMultipleChoiceSingleQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("multipleChoiceSingle"),
  choices: z.array(ZSurveyChoice),
});

export const ZSurveyMultipleChoiceMultiQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("multipleChoiceMulti"),
  choices: z.array(ZSurveyChoice),
});

export const ZSurveyNPSQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("nps"),
  lowerLabel: z.string(),
  upperLabel: z.string(),
});

export const ZSurveyCTAQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("cta"),
  html: z.string().optional(),
  buttonUrl: z.string().optional(),
  buttonExternal: z.boolean(),
  dismissButtonLabel: z.string().optional(),
});

export const ZSurveyRatingQuestion = ZSurveyQuestionBase.extend({
  type: z.literal("rating"),
  scale: z.union([z.literal("number"), z.literal("smiley"), z.literal("star")]),
  range: z.union([z.literal(5), z.literal(3), z.literal(4), z.literal(7), z.literal(10)]),
  lowerLabel: z.string(),
  upperLabel: z.string(),
});

export const ZSurveyQuestion = z.union([
  ZSurveyOpenTextQuestion,
  ZSurveyMultipleChoiceSingleQuestion,
  ZSurveyMultipleChoiceMultiQuestion,
  ZSurveyNPSQuestion,
  ZSurveyCTAQuestion,
  ZSurveyRatingQuestion,
]);

export const ZSurveyQuestions = z.array(ZSurveyQuestion);

export const ZSurveyAttributeFilter = z.object({
  attributeClassId: z.string(),
  condition: z.string(),
  value: z.string(),
});

export const ZSurvey = z.object({
  id: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  name: z.string(),
  type: z.union([z.literal("web"), z.literal("email"), z.literal("link"), z.literal("mobile")]),
  environmentId: z.string(),
  status: z.union([
    z.literal("draft"),
    z.literal("inProgress"),
    z.literal("archived"),
    z.literal("paused"),
    z.literal("completed"),
  ]),
  recontactDays: z.union([z.number(), z.null()]),
  questions: ZSurveyQuestions,
  thankYouCard: ZSurveyThankYouCard,
  triggers: z.array(z.string()),
  numDisplays: z.number(),
  responseRate: z.number(),
  displayOption: z.union([
    z.literal("displayOnce"),
    z.literal("displayMultiple"),
    z.literal("respondMultiple"),
  ]),
  attributeFilters: z.array(ZSurveyAttributeFilter),
  autoClose: z.union([z.number(), z.null()]),
});
