# ConstituencyMap
A map of UK parliamentary constituencies created in D3

## How to run
1. Clone this repository
2. Navigate to the [`map`](./map) directory in the repository and run a server. This can be done by:
    - Using a plugin on a JavaScript IDE
    - Run `python -m http.server` in the terminal
3. Navigate in a browser to the localhost which contains the application

## TODO
- [x] Offset constituency circles on alternate rows
- [x] Fit map to SVG size
    - [ ] Do this dynamically (without hard-coded numbers)
- [ ] Combine map data with 2019 parliamentary results (pre-JS/d3)
    - [ ] Do this step in D3
- [ ] Colour circles by party
- [ ] Use hexagons instead of circles
- [ ] Make constituencies interactive
