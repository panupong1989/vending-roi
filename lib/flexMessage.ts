import type { ROIResult, ScenarioResult } from "@/types";
import { fmt, fmtFull } from "@/lib/calculations";

function paybackLabel(months: number): string {
  if (!isFinite(months)) return "∞";
  if (months < 12) return `${Math.ceil(months)} เดือน`;
  const y = Math.floor(months / 12);
  const m = Math.ceil(months % 12);
  return `${y} ปี ${m} ด.`;
}

function liffRedirectUrl(liffId: string | undefined): string {
  if (!liffId) return "https://liff.line.me/";
  return `https://liff.line.me/${liffId}`;
}

export function buildRoiFlexBubble(args: {
  displayName: string;
  result: ROIResult;
  scenarios: ScenarioResult[];
  liffId?: string;
}): object {
  const { displayName, result, scenarios } = args;
  const url = liffRedirectUrl(args.liffId);

  const roiColor =
    result.annualROI >= 15
      ? "#00c896"
      : result.annualROI >= 8
        ? "#f7a800"
        : "#e74c3c";

  const profitColor = result.netProfit >= 0 ? "#00c896" : "#e74c3c";

  const scenarioRows = scenarios.map((s) => ({
    type: "box",
    layout: "horizontal",
    contents: [
      {
        type: "text",
        text: s.name,
        size: "xs",
        color: "#8590a2",
        flex: 4,
      },
      {
        type: "text",
        text: `${s.roi.toFixed(1)}%`,
        size: "xs",
        weight: "bold",
        color:
          s.key === "best"
            ? "#00c896"
            : s.key === "worst"
              ? "#e74c3c"
              : "#4a6cf7",
        align: "end",
        flex: 2,
      },
      {
        type: "text",
        text: paybackLabel(s.paybackMonths),
        size: "xs",
        color: "#1a2744",
        align: "end",
        flex: 3,
      },
    ],
  }));

  return {
    type: "bubble",
    size: "kilo",
    header: {
      type: "box",
      layout: "vertical",
      backgroundColor: "#1a2744",
      paddingAll: "16px",
      contents: [
        {
          type: "text",
          text: "📊 VendingROI Pro",
          color: "#ffffff",
          weight: "bold",
          size: "md",
        },
        {
          type: "text",
          text: `สรุปผลวิเคราะห์ของ ${displayName}`,
          color: "#b0bccd",
          size: "xs",
          margin: "sm",
        },
      ],
    },
    body: {
      type: "box",
      layout: "vertical",
      spacing: "md",
      paddingAll: "16px",
      contents: [
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              flex: 1,
              contents: [
                {
                  type: "text",
                  text: "ROI ต่อปี",
                  size: "xxs",
                  color: "#8590a2",
                },
                {
                  type: "text",
                  text: `${result.annualROI.toFixed(1)}%`,
                  size: "xl",
                  weight: "bold",
                  color: roiColor,
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              flex: 1,
              contents: [
                {
                  type: "text",
                  text: "คืนทุน",
                  size: "xxs",
                  color: "#8590a2",
                },
                {
                  type: "text",
                  text: paybackLabel(result.paybackMonths),
                  size: "xl",
                  weight: "bold",
                  color: "#f7a800",
                },
              ],
            },
          ],
        },
        {
          type: "separator",
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              flex: 1,
              contents: [
                {
                  type: "text",
                  text: "กำไรสุทธิ/เดือน",
                  size: "xxs",
                  color: "#8590a2",
                },
                {
                  type: "text",
                  text: `฿${fmt(result.netProfit)}`,
                  size: "md",
                  weight: "bold",
                  color: profitColor,
                },
              ],
            },
            {
              type: "box",
              layout: "vertical",
              flex: 1,
              contents: [
                {
                  type: "text",
                  text: "Break-even/วัน",
                  size: "xxs",
                  color: "#8590a2",
                },
                {
                  type: "text",
                  text: `฿${fmt(result.beDaily)}`,
                  size: "md",
                  weight: "bold",
                  color: "#e74c3c",
                },
              ],
            },
          ],
        },
        {
          type: "separator",
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "xs",
          contents: [
            {
              type: "text",
              text: "เปรียบเทียบ 3 สถานการณ์",
              size: "xs",
              weight: "bold",
              color: "#1a2744",
            },
            ...scenarioRows,
          ],
        },
        {
          type: "separator",
        },
        {
          type: "box",
          layout: "vertical",
          spacing: "xs",
          contents: [
            {
              type: "text",
              text: "เงินลงทุนรวม",
              size: "xxs",
              color: "#8590a2",
            },
            {
              type: "text",
              text: `฿${fmtFull(result.totalInvest)}`,
              size: "sm",
              weight: "bold",
              color: "#1a2744",
            },
          ],
        },
      ],
    },
    footer: {
      type: "box",
      layout: "vertical",
      paddingAll: "12px",
      contents: [
        {
          type: "button",
          style: "primary",
          color: "#00c896",
          height: "sm",
          action: {
            type: "uri",
            label: "เปิดเครื่องมืออีกครั้ง",
            uri: url,
          },
        },
      ],
    },
  };
}
