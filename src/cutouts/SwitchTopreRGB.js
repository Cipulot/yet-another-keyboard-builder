import Decimal from 'decimal.js'
import makerjs from 'makerjs'
import { CutoutGenerator } from './CutoutGenerator'

// Topre RGB 1U switch cutout
// Simple filleted rectangle of 14.4272 x 14.3637mm size with top tab of 0.5715mm

export class SwitchTopreRGB extends CutoutGenerator {

    generate(key, generatorOptions) {

        let width = new Decimal("14.4272")
        let height = new Decimal("14.3637")

        const plusHalfWidth = width.dividedBy(new Decimal("2"))
        const minsHalfWidth = width.dividedBy(new Decimal("-2"))
        const plusHalfHeight = height.dividedBy(new Decimal("2"))
        const minsHalfHeight = height.dividedBy(new Decimal("-2"))

        let A = [minsHalfWidth.plus(1.27).toNumber(), plusHalfHeight.toNumber()]
        let B = [plusHalfWidth.minus(1.27).toNumber(), plusHalfHeight.toNumber()]
        let C = [minsHalfWidth.plus(1.27).toNumber(), minsHalfHeight.toNumber()]
        let D = [plusHalfWidth.minus(1.27).toNumber(), minsHalfHeight.toNumber()]

        let E = [minsHalfWidth.toNumber(), plusHalfHeight.minus(1.27).toNumber()]
        let F = [plusHalfWidth.toNumber(), plusHalfHeight.minus(1.27).toNumber()]
        let G = [minsHalfWidth.toNumber(), minsHalfHeight.plus(1.27).toNumber()]
        let H = [plusHalfWidth.toNumber(), minsHalfHeight.plus(1.27).toNumber()]

        let I = [minsHalfWidth.plus(4.6736).toNumber(), plusHalfHeight.plus(0.5715).toNumber()]
        let J = [plusHalfWidth.minus(4.6736).toNumber(), plusHalfHeight.plus(0.5715).toNumber()]
        let K = [minsHalfWidth.plus(4.6736).toNumber(), plusHalfHeight.toNumber()]
        let L = [plusHalfWidth.minus(4.6736).toNumber(), plusHalfHeight.toNumber()]

        var model = {
            paths: {
                tabtop: new makerjs.paths.Line(I, J),
                tableft: new makerjs.paths.Line(I, K),
                tabright: new makerjs.paths.Line(J, L),
                lineTopLeft: new makerjs.paths.Line(A, K),
                lineTopRight: new makerjs.paths.Line(L, B),
                lineBottom: new makerjs.paths.Line(C, D),
                lineLeft: new makerjs.paths.Line(E, G),
                lineRight: new makerjs.paths.Line(F, H),
                chamferTopLeft: new makerjs.paths.Line(E, A),
                chamferTopRight: new makerjs.paths.Line(F, B),
                chamferBottomLeft: new makerjs.paths.Line(G, C),
                chamferBottomRight: new makerjs.paths.Line(H, D)
            }
        }

        return model;
    }
}