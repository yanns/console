import { IdTranslator } from '../../../shared/providers/id-translator';
import { TargetManager } from '../../providers/target-manager';
import type { MutationResolvers } from './../../../../__generated__/types';

export const setTargetValidation: NonNullable<MutationResolvers['setTargetValidation']> = async (
  _,
  { input },
  { injector },
) => {
  const translator = injector.get(IdTranslator);
  const [organization, project, target] = await Promise.all([
    translator.translateOrganizationId(input),
    translator.translateProjectId(input),
    translator.translateTargetId(input),
  ]);

  const targetManager = injector.get(TargetManager);
  await targetManager.setTargetValidation({
    organizationId: organization,
    projectId: project,
    targetId: target,
    enabled: input.enabled,
  });

  return targetManager.getTarget({
    organizationId: organization,
    projectId: project,
    targetId: target,
  });
};
