import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useEffect } from "react"

import Loader from "./loader"
import sw from "../app/utils/switch"
import { debounce } from "../app/utils/debounce"

import { sendMessage } from "../app/utils/chrome-message"
import { get } from "../app/utils/chrome-storage"

import Fab from "@material-ui/core/Fab"
import BuildIcon from "@material-ui/icons/Build"

import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import AppBar from "@material-ui/core/AppBar"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"

import { LightenDarkenColor } from "lighten-darken-color"

import { makeStyles } from "@material-ui/core/styles"

import { Group } from "@vx/group"
import { Pie } from "@vx/shape"
import { localPoint } from "@vx/event"
import { PatternWaves, PatternCircles, PatternLines } from "@vx/pattern"
import { useTooltip, TooltipWithBounds } from "@vx/tooltip"

const useStyles = makeStyles({
  fab: {
    position: "absolute",
    top: 24,
    right: 16,
  },
  tab: {
    minWidth: 100,
    maxWidth: 100,
  },
})

const TabPanel = ({ value, index, children }) => {
  if (value !== index) return null
  return children
}

const Leg = ({ data, day }) => {
  const sendHighlight = debounce((args) => {
    sendMessage(args)
  }, 50)

  return (
    <div style={{ marginTop: "24px" }}>
      <Grid container spacing={3}>
        {data.map(([label, color, value, t], i) => (
          <Grid
            item
            xs={4}
            key={i}
            onMouseLeave={() => sendHighlight({ type: "unhighlight" })}
            onMouseOver={() => {
              if (color === "#fff" || color === "#ffffff") return
              sendHighlight({
                type: "highlightCategory",
                color,
                day,
              })
            }}
          >
            <div className="legend">
              <div
                className="legend__square"
                style={{ backgroundColor: color }}
              />
              <div className="legend__text">
                <span
                  style={{
                    fontSize: 16,
                  }}
                >
                  {label}
                </span>
                <div style={{ paddingTop: 8 }}>
                  <span>
                    <b style={{ fontSize: 16 }}>{value}</b>%
                    <span style={{ marginLeft: 8 }}>
                      {t && t.h > 0 && (
                        <span>
                          <span style={{ fontSize: 16 }}>{t.h}</span>hr
                        </span>
                      )}
                      {t && t.m > 0 && (
                        <span>
                          <span style={{ fontSize: 16 }}>{t.m}</span>m
                        </span>
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const Chart = ({ data, day, size }) => {
  const width = 664 * size
  const height = 220
  const cy = height / 2
  const cx = width / 2
  const radius = Math.min(width, height) / 2

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    showTooltip,
    hideTooltip,
  } = useTooltip()

  const mapped = data.map(([label, color, value]) => ({
    label: label === "null" ? "" : label,
    color: label === "null" ? "#fff" : color,
    value,
  }))

  const sendHighlight = debounce((args) => {
    sendMessage(args)
    args.type === "unhighlight" ? hideTooltip() : showTooltip(args.tooltip)
  }, 50)

  const patternDarken = -50

  return (
    <>
      <svg className="chart" width={width} height={height}>
        <Group top={cy} left={cx}>
          <Pie
            className="chart"
            data={mapped}
            outerRadius={radius - 8}
            pieValue={({ value }) => value / 100}
            pieSortValues={(a, b) => a.value - b.value}
          >
            {(pie) =>
              pie.arcs.map((arc, i) => (
                <React.Fragment key={i}>
                  {sw({
                    1: () => (
                      <PatternWaves
                        id={`pattern-${i}`}
                        height={14}
                        width={14}
                        background={arc.data.color}
                        strokeWidth={1}
                        stroke={LightenDarkenColor(
                          arc.data.color,
                          patternDarken
                        )}
                      />
                    ),
                    2: () => (
                      <PatternCircles
                        id={`pattern-${i}`}
                        radius={1}
                        height={12}
                        width={12}
                        background={arc.data.color}
                        strokeWidth={1}
                        fill={LightenDarkenColor(arc.data.color, patternDarken)}
                      />
                    ),

                    default: () => (
                      <PatternLines
                        id={`pattern-${i}`}
                        height={10}
                        width={10}
                        background={arc.data.color}
                        strokeWidth={1}
                        stroke={LightenDarkenColor(
                          arc.data.color,
                          patternDarken
                        )}
                        orientation={["diagonal"]}
                      />
                    ),
                  })(i % 3)}
                  <g
                    className={
                      arc.data.color === "#fff" || arc.data.color === "#ffffff"
                        ? "chart__segment chart__segment--white"
                        : "chart__segment chart__segment--color"
                    }
                    key={`letters-${arc.data.label}-${i}`}
                  >
                    <path
                      fill={
                        arc.data.color === "#fff" ||
                        arc.data.color === "#ffffff"
                          ? arc.data.color
                          : `url(#pattern-${i})`
                      }
                      onMouseOver={(evt, datum) => {
                        if (
                          arc.data.color === "#fff" ||
                          arc.data.color === "#ffffff"
                        )
                          return

                        const coords = localPoint(
                          evt.target.ownerSVGElement,
                          evt
                        )

                        sendHighlight({
                          type: "highlightCategory",
                          tooltip: {
                            tooltipLeft: coords.x,
                            tooltipTop: coords.y,
                            tooltipData: arc.data,
                          },
                          ...arc.data,
                          day,
                        })
                      }}
                      onMouseLeave={() =>
                        sendHighlight({ type: "unhighlight" })
                      }
                      d={pie.path(arc)}
                    />
                  </g>
                </React.Fragment>
              ))
            }
          </Pie>
        </Group>
      </svg>
      {tooltipOpen && (
        <TooltipWithBounds
          key={Math.random()}
          top={tooltipTop}
          left={tooltipLeft}
        >
          {tooltipData.label} - <strong>{tooltipData.value}%</strong>
        </TooltipWithBounds>
      )}
    </>
  )
}

const Popup = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState()

  const [tab, setTab] = useState(0)

  useEffect(() => {
    setLoading(true)
    get("config", ({ config } = {}) => {
      sendMessage({ type: "getSummary", config }, (summary) => {
        setSummary(summary)
        setLoading(false)
      })
    })
  }, [])

  if (loading || !summary) return <Loader />

  return (
    <div className="container">
      <AppBar color="transparent">
        <Tabs
          indicatorColor="secondary"
          textColor="secondary"
          value={tab}
          onChange={(_, newTab) => setTab(newTab)}
        >
          <Tab label="Weekly" classes={{ root: classes.tab }} />
          {summary.daily.map(({ day }, i) => (
            <Tab
              key={i}
              label={day.slice(0, 3)}
              classes={{ root: classes.tab }}
            />
          ))}
        </Tabs>
        <Fab
          onClick={() => chrome.tabs.create({ url: "/options.html" })}
          color="secondary"
          className={classes.fab}
          size="small"
        >
          <BuildIcon />
        </Fab>
      </AppBar>

      <Grid style={{ padding: "70px 20px 20px" }} container spacing={3}>
        {[summary.weekly]
          .concat(summary.daily)
          .map(({ day, total, summary }, i) => (
            <TabPanel key={i} value={tab} index={i}>
              <Grid item xs={4}>
                <Chart size={4 / 12} data={summary} day={day} />
              </Grid>
              <Grid item xs={8}>
                <h2>{total}</h2>
                <Divider style={{ margin: "16px 0" }} />
                <Leg data={summary} day={day} />
              </Grid>
            </TabPanel>
          ))}
      </Grid>
    </div>
  )
}

// --------------

ReactDOM.render(<Popup />, document.getElementById("root"))
