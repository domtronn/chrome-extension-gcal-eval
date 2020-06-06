import * as React from "react"
import * as ReactDOM from "react-dom"
import { useState, useEffect } from "react"

import { adjustCol } from "../app/utils/col"
import { debounce } from "../app/utils/debounce"

import { sendMessage } from "../app/utils/chrome-message"

import Tab from "@material-ui/core/Tab"
import Tabs from "@material-ui/core/Tabs"
import Divider from "@material-ui/core/Divider"
import Grid from "@material-ui/core/Grid"

import { makeStyles } from "@material-ui/core/styles"

import { Group } from "@vx/group"
import { Pie } from "@vx/shape"

const useStyles = makeStyles({
  wrapper: {
    alignItems: "flex-start",
  },
})

const TabPanel = ({ value, index, children }) => {
  if (value !== index) return null
  return children
}

const Leg = ({ data }) => (
  <div style={{ marginTop: "24px" }}>
    <Grid container spacing={3}>
      {data.map(([label, color, value], i) => (
        <Grid item xs={6} key={i}>
          <div className="legend">
            <div
              className="legend__square"
              style={{ backgroundColor: color }}
            />
            <div className="legend__text">
              {value}% - {label}
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
  </div>
)

const Chart = ({ data, day }) => {
  const width = 266
  const height = 220
  const cy = height / 2
  const cx = width / 2
  const radius = Math.min(width, height) / 2

  const mapped = data.map(([label, color, value]) => ({
    label: label === "null" ? "" : label,
    color: label === "null" ? "#fff" : color,
    value,
  }))

  const sendHighlight = debounce((args) => sendMessage(args), 50)

  return (
    <svg className="chart" width={width} height={height}>
      <Group top={cy} left={cx}>
        <Pie
          className="chart"
          data={mapped}
          outerRadius={radius - 20}
          pieValue={({ value }) => value / 100}
          pieSortValues={(a, b) => a.value - b.value}
        >
          {(pie) =>
            pie.arcs.map((arc, i) => {
              const [centroidX, centroidY] = pie.path.centroid(arc)
              return (
                <g
                  className="chart__segment"
                  key={`letters-${arc.data.label}-${i}`}
                >
                  <path
                    onMouseOver={() => {
                      if (arc.data.label === "free") return
                      sendHighlight({
                        type: "highlightCategory",
                        ...arc.data,
                        day,
                      })
                    }}
                    onMouseLeave={() => sendHighlight({ type: "unhighlight" })}
                    d={pie.path(arc)}
                    fill={arc.data.color}
                  />
                  <text
                    fill={
                      arc.data.label === "free"
                        ? "#fff"
                        : adjustCol(arc.data.color, -70)
                    }
                    textAnchor="middle"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={12}
                  >
                    {arc.data.value}%
                  </text>
                </g>
              )
            })
          }
        </Pie>
      </Group>
    </svg>
  )
}

const Hello = () => {
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const [summary, setSummary] = useState()

  const [tab, setTab] = useState(0)

  useEffect(() => {
    setLoading(true)
    sendMessage({ type: "getSummary" }, (summary) => {
      setSummary(summary)
      setLoading(false)
    })
  }, [])

  if (loading || !summary) {
    return <div className="container">loading...</div>
  }

  return (
    <div className="container">
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Tabs
            indicatorColor="secondary"
            textColor="secondary"
            orientation="vertical"
            value={tab}
            onChange={(_, newTab) => setTab(newTab)}
          >
            <Tab label="Weekly" classes={{ wrapper: classes.wrapper }} />
            {summary.daily.map(({ day }, i) => (
              <Tab
                key={i}
                label={day.slice(0,3)}
                classes={{ wrapper: classes.wrapper }}
              />
            ))}
          </Tabs>
        </Grid>

        <Grid item xs={10}>
          {[{ summary: summary.weekly }]
            .concat(summary.daily)
            .map(({ day, total, summary }, i) => (
              <TabPanel key={i} value={tab} index={i}>
                <Grid
                  style={{ marginTop: "20px", marginBottom: "20px" }}
                  spacing={3}
                  container
                >
                  <Grid item xs={6}>
                    <Chart data={summary} day={day} />
                  </Grid>
                  <Grid item xs={6}>
                    {total && (
                      <span>
                        <b>{day}</b> - {total}
                      </span>
                    )}
                    {!total && (
                      <span>
                        <b>Weekly</b>
                      </span>
                    )}
                    <Divider style={{ margin: "16px 0" }} />
                    <Leg data={summary} />
                  </Grid>
                </Grid>
              </TabPanel>
            ))}
        </Grid>
      </Grid>
    </div>
  )
}

// --------------

ReactDOM.render(<Hello />, document.getElementById("root"))
